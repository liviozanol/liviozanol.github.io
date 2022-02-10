---
slug: full-stack-it-automation-part-8-demo-gitlab-runner
title: Full-Stack Automation Part 8 - Demo - Runner
authors: [livio]
tags: [automation, awx, ansible, gitlab, network automation, gitlab-ci, CI/CD, gitops]
---

## Gtilab-CI/Gitlab Runner

In the previous post we have defined our structured data, stored it on gitlab, created our playbooks and inventories and imported them on AWX. Now we will prepare our CI/CD pipeline to monitor changes on our data on gitlab and tell AWX to execute our playbook. Gitlab runner will be responsible for these tasks, registering on our gitlab projects/group and executing a series of tasks once our data is changed, calling AWX API to run our workflow playbook passing our modified data and monitoring our job in execution also using AWX API.

All files generated on this section (and on previous) are on full-stack automation github repo (https://github.com/liviozanol/full-stack-automation), so you don't need to create it yourself again.

Everytime our gitlab repository is changed, gitlab-ci will get the contents of our wan_site_cfg.json file and send it to AWX as a variable, calling a job/playbook/template or a workflow that will implement the changes on our equipments.

After concluding this section you will have something like a GitOps for our wan automation service. If you change some information from your WAN site on gitlab repo, AWX will implement it on equipment.

<!--truncate-->

:::note
Please, note that in this demo we installed gitlab runner using "privileged" mode and also mapped docker host socket to the container. This means that gitlab runner container can virtually execute any docker command directly into our docker host, stopping, starting, running and removing ANY container (including AWX and itself). This is NOT a good practice, but we have made this way because we will use gitlab runner to also start our APIs and UI container on the demo.

In a production environment, as stated before, its a good practice to separate functions on different hosts (user APIs, UI and its gitlab runner CI/CD on a isolated place from AWX playbooks and its own gitlab runner CI/CD) and if possible creating/using more than one gitlab. The gitlab runner that starts our AWX jobs, does not need privileged access and only needs to connect to AWX and gitlab APIs, so you don't need to map docker host socket neither use privileged mode on this runner and could use [docker in docker](https://github.com/jpetazzo/dind) to run your curl/bash commands or execute commands directly on gitlab runner container.
:::

Every file for Gitlab Runner config to our demo can be found [here](https://github.com/liviozanol/full-stack_automation/tree/master/demo/gitlab-ci)

## Registering our runner

To register our gitlab-CI/runner we first need a registration token and we will get this token using gitlab API. After getting this token we will ```docker exec``` a command on gitlab runner container to register it on the wan_site group. After runner is registered, everytime a file is changed on any repository inside wan_site group, gitlab runner will look for a .gitlab-ci.yml file and use it to start our CI/CD pipeline.

## Building our .gitlab-ci.yml

Will be used a quite simple pipeline with only 1 stage that gets required credentials from our Vault 2 and calls AWX API to start our workflow job template and monitors it until it stops. You could insert other stages to improve your pipeline and you should consider this if you are making more complex automations. Some examples for network automation:
- Add a [Jerikan](https://vincent.bernat.ch/en/blog/2021-network-jerikan-ansible) stage to to parse your data and send it already parsed to AWX (needs to change the playbook)
- Add a [batfish](https://www.batfish.org/) stage to validate your config after parsing it.
- Add a [network simulation tool](https://netsim-tools.readthedocs.io/) stage to test your parsed configs in a lab.
- Add a "homologation" test stage, running another playbook (or changing hostname or sending to another specific AWX) that will implement your changes on some lab equipment and validate its functionalities. Could either be physical equipments or lab routers running on a qemu emulation (see [eve-ng](https://www.eve-ng.net/) for a nice solution)
- Add an approval stage making the pipeline wait until an operator access gitlab and approves the changes (or build an API/UI for this step!).

Our 1 stage pipeline will use a basic alpine image from docker hub and we will install curl and jq on it to use on our APIs calls. You could (and I think it's a good practice) build your own image only with basic Shell functionalities, curl, jq and other tools that you use on each stage.

To query Vault and get AWX user/pass we need a token and we'll store it using the gitlab variable as 'masked'. It's the only presumably sensible information that will be stored on gitlab. Any other sensitive data that will be needed must be stored on Vault and queried from it on run time. You should restrict the access to this access token and for AWX user/pass on hashicorp Vault to only allow queries from gitlab ip address, but we won't do this on the demo. If you are on a production environment I hope you built Vault and installed it already on an isolated environment with restricted L3/L4 access and will also make the application restriction mentioned. 

We will also use 2 more variables on gitlab: Vault URL and AWX IP Address/Port. You could store the AWX ip/port on Vault if you want...

After getting the AWX credentials, our pipeline will call AWX API to run our playbook, getting the modified data from wan_site_data.json on the repository and simply passing it as an extra_vars to AWX.

At the end we have a simple while loop that keeps querying the AWX API to get the job status and either exit 0 (if the job is successful) or 1 (if it fails).

```yml
image: alpine:3.15.0

before_script: #Installing curl and jq
  - which curl || (apk --no-cache add curl)
  - which jq || (apk --no-cache add jq)

run:
  script:
    - PLAYBOOK_NAME="wan_automation_workflow_template"
    #Getting credentials from vault
    - "CURL_RESULT=`curl -sk -H \"X-Vault-Token: $VAULT_TWO_TOKEN\" \"$VAULT_TWO_URL/v1/secret/data/awx_secret\"`"
    - "AWX_USER=`echo $CURL_RESULT | jq -r .data.data.awx_user`"
    - "AWX_PASS=`echo $CURL_RESULT | jq -r .data.data.awx_pass`"
    - AWX_URL="https://$AWX_USER:$AWX_PASS@$AWX_ADDRESS_PORT"
    #Querying AWX API to get workflow job template ID
    - "JOB_TEMPLATE_ID=`curl -sk $AWX_URL/api/v2/workflow_job_templates/?search=$PLAYBOOK_NAME | jq .results[].id`"
    #Calling AWX API to run our workflow
    - "JOB_ID=`curl --header \"Content-Type: application/json\" -sk $AWX_URL/api/v2/workflow_job_templates/$JOB_TEMPLATE_ID/launch/ --data \"{\\\"extra_vars\\\":$(cat wan_site_data.json)}\" | jq .id`"
    #Monitoring workflow
    #COUNT is used as a protection so we don't have ifnite loops
    - COUNT=0
    - MAX_COUNT=80
    - >
      while true; do
        JOB_STATUS_TEXT=`curl -sk $AWX_URL/api/v2/workflow_jobs/$JOB_ID/ | jq -r .status`
        if [ "$JOB_STATUS_TEXT" == "successful" ]; then
          exit 0
        fi
        if [ "$JOB_STATUS_TEXT" == "failed" ]; then
          exit 1
        fi
        sleep 5
        COUNT=$(( COUNT + 1 ))
        if [ "$COUNT" -gt "$MAX_COUNT" ]; then
          echo "protection against infinite loop reached. aborting"
          exit 1
        fi
      done;
```