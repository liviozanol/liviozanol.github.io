---
slug: full-stack-it-automation-part-7-demo-2
title: Full-Stack Automation Part 7 - Demo (subpart 2)
authors: [livio]
tags: [automation, awx, ansible, gitlab, network automation, gitlab-ci, CI/CD, gitops]
---

## Creating Playbooks and complements

On the previous post we have defined our structured data and created sample projects on gitlab. Now that our data structure is defined we can start to build our playbooks and templates. On this section we'll build our inventory, templates, workflow and playbook.

All files generated on this section (and on previous) are on full-stack automation github repo (https://github.com/liviozanol/full-stack-automation), so you don't need to create it your self again.

Ansible/AWX are only the executor of automation tasks and they are never acessed by end-users. We don't need to have separation/segregation on a client basis and you don't need to carry about this.

Everytime our gitlab repository is changed, gitlab-ci will get the contents of our wan_site_cfg.json file and send it to AWX as a variable, calling a job/playbook/template or a workflow that will implement the changes on our equipments.

<!--truncate-->

## Inventory

On AWX, you can have different inventories for each Project. Considering this, lets define our project being our service in way that for each service we can have different jobs/playbooks, templates and inventories. You could also use any separation you like (per your campany techinical areas - good for permission control, per element types, per automation types, etc.).

If you need to use some kind of jump/bastion host to access your devices, you can also define it on this file with variables for all hosts, group of hosts or single hosts. You don't need to keep password/key for the SSH access here, you can just point to a place where key will be and get it from harshicorp vault. [read more](https://docs.ansible.com/ansible/latest/reference_appendices/faq.html#how-do-i-configure-a-jump-host-to-access-servers-that-i-have-no-direct-access-to)

Since we'll be using a lot a YAML (Sadly... I really prefer json) I think its nice to build the inventory also using YAML, but feel free to use INI as well looking at [reference guide](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html).

Our YAML for this wan_site automation project can be like this:
```YAML
all:
  vars:
    dumb_var: you_can_have_you_global_var_here_including_ssh_args
  children:
    ROUTERS_US:
      vars:
        dumb_var2: you_can_have_you_group_var_here_including_ssh_args
      hosts:
        site_1:
		  vars:
            dumb_var3: you_can_have_you_host_var_here_including_ssh_args
          ansible_host: 127.0.0.1 #device IP that accepts SSH frmo ansible (or from bastion/jump host)
		  ansible_port: 10122 #SSH listenport
          ansible_connection: network_cli #ansible connection type
          ansible_network_os: ios #variable with device OS that can be used later on our playbook to convert a propper template file
		site_3:
          ansible_host: 127.0.0.1
		  ansible_port: 10322
          ansible_connection: network_cli
          ansible_network_os: junos
	ROUTERS_ASIA:
      hosts:
        site_2:
          ansible_host: 127.0.0.1
		  ansible_port: 10222
          ansible_connection: network_cli
          ansible_network_os: eos
		site_4:
          ansible_host: 127.0.0.1
		  ansible_port: 10422
          ansible_connection: network_cli
          ansible_network_os: vrp
```

On our example inventory files, remote sites are separated by geographical area, but you can use any separation you want. You can even have a global inventory file mantained by another team that is updated on gitlab by an ansible playbook itself (imagine a initial deploy phase).

The important thing to note here is that the "hosts" names are the ones used to identify on which host jobs/playbooks needs to be executed. So, on our demo, *hosts names on inventory (e.g.: site_1) must match the repository name on gitlab*. You could use a field on the structured data (or another file) for this and make an internal name/id that is not seen nor edited by user, but let's keep it simple on the demo.

## Building Playbooks

We will organize our playbooks in a way that we can run commands on equipments depending on its Operating System/type. You could do something more structured using templates, correct ansible modules for each command block (e.g.: acl, interface config, etc.) and also use roles functions separated by OS/type, but I think that a more simple approach is better for maintenance and make you less dependent on ansible and its own organization itself. A point to remember is that since every change will be made throught an API, data is already more validated than if we called ansible directly or via gitlab.

For each type of OS we will have 1 playbook (e.g.: ios_playbook.yml). The playbook will be responsible to convert (a.k.a. parse) our structured JSON data received as variable to commands that needs to be executed on equipments. If the commands are too complex you could use templates to make you life more easy (or not! since jinja2 like language are ridiculous complex). You could also use something like [Jerikan](https://vincent.bernat.ch/en/blog/2021-network-jerikan-ansible) and deliver your data already parsed to ansible.

```ios_playbook.yml``` example - only modifying the first interface:

```YAML
---
- name: Get Current ACL Name
  hosts: '{{ json_data.site_id }}'
  gather_facts: no

  tasks:
  - name: get running config interface section
    ios_command:
      commands:
        - show running-config | sec interface {{ json_data.lan_interfaces[0].interface_name }} | inc access-group
    register: acl_name

  - name: Register ACL IN Name
    set_fact:
      in_acl: "{{ acl_name.stdout_lines[0][0] | regex_replace('^\\s*ip\\s+access-group\\s+(.*)\\s+in.*$','\\1') }}" #this regex will capture the ACL name (a string between word 'access-group' and word 'in')
 
  - name: Register ACL OUT Name
    set_fact:
      out_acl: "{{ acl_name.stdout_lines[0][1] | regex_replace('^\\s*ip\\s+access-group\\s+(.*)\\s+out.*$','\\1') }}" #this regex will capture the ACL name (a string between word 'access-group' and word 'out')
  - name: Register current timestamp to use as new ACL name
    set_fact:
	  curr_timestamp: ansible_date_time.epoch
        
        

- name: Create New IN ACL
  hosts: '{{ json_data.site_id }}'
  gather_facts: no
  
  tasks:
  - name: Create IN ACL
	ios_config:
	  lines:
	    - 'ip access-list {{ curr_timestamp }}_in'
  
  - name: Create IN ACEs
    ios_config:
      lines:
        "{{ item.value.action  }}"
      match: none
	loop: "{{ json_data.lan_interfaces[0].in_acl | dict2items }}"

  
  - name: Remove ACL antiga
    nxos_config:
      save_when: always
      lines:
        - no ip access-list {{in_acl}}
        - no ip access-list {{out_acl}}
      match: none


```

## Gitlab Structure

Since gitlab is being used as the place to store the data for all automated services, we must define how to use its structure to make it easy (and usable) to manipulate data for each of these. Gitlab has a feature called [groups and subgroups](https://docs.gitlab.com/ee/user/group/subgroups/) that allow us to create a hierarchical tree for our projects.
ample JSON on the previous section). It also has built-in sort and filter functions using mongodb style query.

## Creating Gitlab Structure

You can create the structure using the web interface, creating the wan_sites group, clients subgroups, sites projects and manually creating the a dummy wan_site_cfg.json file on each, or you can use gitlab API for this like below.
