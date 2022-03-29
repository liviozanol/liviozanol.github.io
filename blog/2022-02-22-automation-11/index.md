---
#draft: true
slug: full-stack-it-automation-part-11
title: Full-Stack Automation Part 11 - Conclusions
authors: [livio]
tags: [automation, awx, ansible, gitlab, network automation, gitlab-ci, CI/CD, gitops, react admin]
---

## Conclusion
This series of posts demonstrated how to use some nice tools to build a simple full-stack automation solution that can be  used to automate almost everything on your infrastructure.

The architecture demonstrated is not static and can be modified to best fit a team/company needs.

You can (and should) separate the API on 2 layers: One to deal with data validation and business rules (this is accessed by the user); One with basic validation, parsing and uploading data on gitlab.

You can make an audit function, either together on the pipeline/awx or separated. You gather info from your automated element (eg.: router) and compare it with the information on gitlab (reverse parsing it) to be sure that what was sent is really on the automated element.

You can (and really should) add a bastion host to access your automated elements, and make AWX use, for example, SSH tunnel prior to connecting to the automated element, protecting it even more from undesirable access.

<!--truncate-->

To build the full-stack automation from scratch, were spent the following estimate hours:

- Automate AWX installation and customization it using its APIs: **~ 8 hours**.
    - Some bugs and CentOs deprecated version really impacted on this. Had some previous knowledge on how to use AWX API, which helped.
- Automate installation and customization of Gitlab, Gitlab CI and 2 Hashicorp Vault: **~ 4 hours**.
    - These are pretty straightforward.
- Build the ansible playbook and test it: **~ 6 hours**.
    - Jinja templates and language are difficult to understand. Had previous knowledge on playbooks, but very few on jinja templates.
- Build the API using [Python FastAPI](https://fastapi.tiangolo.com/): **~ 4 hours**
    - Had some basic knowledge of python dev and zero knowledge on Fast API. Very nice framework with easy learning curve.
- Build and test the main gitlab CI/CD script which is responsible to get modified data and push to AWX: **~ 1,5 hour**.
    - Had some previous knowledge on gitlab-CI.
- Build the CI/CD for the APIs, Bastion Host and Web Interface: **~ 2 hours**
    - Had some previous knowledge on gitlab-CI.
- Make the web interface using basic React Admin elements: **~ 4 hours**.
    - Had some previous knowledge on React Admin.
    - Adjusting the queries from/to the API took most of the time.
    - Making the basic list/edit page was easy (~ 2 hours?). You can see that [the code is simple](https://github.com/liviozanol/full-stack_automation/blob/master/demo/fullstack-ui/src/wanSite.js).
    - Making complex things requires good knowledge on JS/React JS.




:::note
Feel free to contact me by e-mail: livio at zanol.com.br to further discuss this subject.
:::
