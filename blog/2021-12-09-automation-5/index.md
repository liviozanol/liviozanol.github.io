---
slug: full-stack-it-automation-part-5-gitlabci
title: Full-Stack Automation Part 5 - Gitlab CI
authors: [livio]
tags: [automation, awx, ansible, gitlab, network automation, gitlab-ci, CI/CD, gitops]
---

## Gitlab-CI {#gitlab-ci}

Gitlab-CI is a Continuous Integration and Continuous Delivery/Deployment solution built by gitlab. It fully integrates with gitlab listening for changes on repositories and executing pipelines to automate build, test, aprove and deploy aplications.

It runs on a container and, after a change is triggered, uses docker images to execute steps configured on the pipeline.

More about Gitlab can be found on its site: https://docs.gitlab.com/ee/ci/


## Gitlab-CI Role {#gitlab-ci-role}

Gitlab-CI will be used as the mechanism that starts automation. It will monitor gitlab repositories, detect changes on it and call AWX to implement changes on automated resources (eg.: router). This is its main function, but it will also be used to automatic create containers needed by the API and web interface

Gitlab-CI talks to almost every component on the solution:
- Calls AWX API to run and monitor jobs/playbook execution;
- Monitor changes on gitlabs repository to run its CI/CD pipelines;
- Create full-stack API containers and can also talk to them if need on a pipeline step;
- Get keys/secrets from harshicorp vault 1 if needed on the pipeline and use them to talk to gitlab itself or to talk to full-stack automation APIs.





![Gitlab-CI role on architecture](./img/gitlab-ci_arch.svg)

## Gitlab-CI Alternatives {#gitlab-alternatives}

You can usike ansible at all, you can use your preferred automation tool throu
gh ansible as explained, or just build a new API for you custom automation tool - if it doesn't have (and insert a MQ solution as stated on gitlab session).


## Gitlab-CI Installation and Configuration {#gitlab-install-config}

First, if you haven't cloned the architecture repo from github, please do so: ```git clone https://github.com/liviozanol/full-stack-automation```

TL;DR: Simply run the shell script
```
/bin/sh create_awx.sh
```

:::note
You need to have jq (used by script), ansible, openssl, docker and docker-compose available. Docker service must be running and healthy (check with ```sudo docker ps``` or similar).

As of 2021-12-07, you also need to be able to execute ```make``` (i.e.: build-essential, make, automake, gcc, etc.).
:::

1- Clone AWX Repo (version 19.5.0)
```git clone -b 19.5.0 https://github.com/ansible/awx.git```

2- CD to the directory
```cd awx```

3- Change 

 
Everything is set to use AWX in the architecture. On further steps, after we create our repos on gitlab, we'll be creating projects, inventories and templates. All linked to the gitlab source.