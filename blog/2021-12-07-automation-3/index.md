---
slug: full-stack-it-automation-part-3-awx
title: Full-Stack Automation Part 3 - AWX
authors: [livio]
tags: [automation, awx, ansible, gitlab, network automation, terraform, playbook, inventory]
---

## Ansible/AWX {#ansible-awx}

Ansible is an automation platform that supports a wide range of functions and can be used to automate almost anything: From network devices from different manufacturers to custom web APIs. The choose for ansible in this layer is for this reason and also because of AWX.

AWX is a complete automation solution based on ansible. It boosts ansible adding a lot of functionalities to make a complete automation tool mainly introducing a nice web system. Some cool functionalities includes:
- A web interface where you can make all life-cycle related activites with
playbooks (monitor, execute, cancel, group, etc.). You still create the playbooks external.
- Workflow of playbooks where you can execute one or more playbooks in sequence giving certain circunstances and even insert aproval tasks!
- Nice web forms with basic data validation to start playbooks execution.
- Notification of jobs states using e-mail, telegram, rocketchat, etc.
- Integration with git or other sources to read inventories and playbooks.
- LDAP and other integrations to autentication/authorizization.
- And more important: A complete REST API that gives will access to all of the above and more!


Note that AWX comes with a form to play tasks/plabooks that could be used for more simple automations. If you have small tight teams to OAMP only some infrasctructure you could use it directly! But secrets for automated resources could be leaked and I do not think that this is a good solution for end-user direct intervention. So do it at your own risk.

## Ansible/AWX Role {#ansible-role}

Ansible/AWX is the "engine" that will access automation alements and execute actions to implement the changes submited by user (i.e. run a playbook) and validated by API and CI/CD.

- It talks to any automated resource to execute change actions.
- It talks to harshicorp vault 2 to get keys/pass to access the automated resources
- It talks to harshicorp vault 1 to get keys/pass to access gitlab
- It talks to gitlab to get inventories, playbooks and complementary files (templates, etc.).
- It receives API requests from Gitlab CI to start and monitor jobs/playbooks.

Even if AWX have an aproval task on workflows, the solution described here won't use it. Since AWX have access to sensitive data, like key or pass to access infrasctructure resources, we need to minimize any human intervention on it and also its point of contact with other infrastructure. Only gitlab CI/CD will talk actively to AWX on full-stack automation archtecture. AWX  solution will be used solely as a way to start and monitor tasks execution.

![AWX/ansible role on architecture](./img/awx_arch.svg)

## Ansible/AWX Alternatives {#ansible-alternatives}

You can use other automation tool you like, but since the solution is using AWX as an API to excute and monitor jobs, its important that you execute it using ansible playbooks. Since ansible can execute any arbitrary shell command, you can use [terraform](https://www.terraform.io/), [nornir](https://nornir.readthedocs.io/en/latest/), [napalm](https://napalm.readthedocs.io/en/latest/), [expect](https://en.wikipedia.org/wiki/Expect), custom scripts, whatever, but it needs to be called from ansible. You can, for example, install custom linux packages on ansible job execution container and just call a shell script in a playbook.

Yes, ansible can be [slow in some situations](https://networklore.com/ansible-nornir-speed/), and templates or [jinja2](https://docs.ansible.com/ansible/latest/user_guide/playbooks_templating.html) like language sometimes are a pain in the ass, but for this architecture, objetiving a manufacturer agnostic and wide range automation, its important. If you need high speeds or don't like ansible at all, you can use your preferred automation tool through ansible as explained, or just build a new API for you custom automation tool - if it doesn't have (and insert a MQ solution as stated on gitlab session).


## Ansible/AWX Installation and Configuration {#ansible-install-config}

First, if you haven't cloned the architecture repo from github, please do so: ```git clone https://github.com/liviozanol/full-stack-automation```

TL;DR: Simply run the shell script
```
/bin/sh create_awx.sh
```

In this guide AWX/ansible will be installed using docker-compose (which is not indicated for producion - should be kubernetes instead). Will be used the ["official" awx docker-compose guide](https://github.com/ansible/awx/blob/devel/tools/docker-compose/README.md).

:::note
You need to have ansible, openssl, docker and docker-compose available. Docker service must be running and healthy (check with ```sudo docker ps``` or similar).

As of 2021-12-07, you also need to be able to execute ```make``` (i.e.: build-essential, make, automake, gcc, etc.).
:::

1- Clone AWX Repo (version 19.5.0)
```git clone -b 19.5.0 https://github.com/ansible/awx.git```

2- CD to the directory
```cd awx```

3- Change passwords/secrets
```sed -i 's/# pg_password=""/pg_password="fullstack_automation_pg"/g;s/# broadcast_websocket_secret=""/broadcast_websocket_secret="fullstack_automation_broadcast_websocket"/g;s/# secret_key=""/secret_key="fullstack_automation_secret"/g' tools/docker-compose/inventory```

4- Build the image
```make docker-compose-build```

5- run AWX
```make docker-compose COMPOSE_UP_OPTS=-d```

COLOCAR KEY GIT
CRIAR PROJETO
CRIAR USER/KEY GIT-LAB-CI
COLOCAR PARTE DO VAULT