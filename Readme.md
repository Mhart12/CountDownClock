# www.vmllabs.com

This repository contains the code and assets for www.vmllabs.com.  The site is hosted in VML's YRGRP AWS account in versioned s3 buckets

## Repository Structure

- build - contains build scripts and jenkins jobs
- content - contains content of site.

## Deployment pipeline

### Envronments

- Dev: [www-vmllabs.vmldev.com](http://www-vmllabs.vmldev.com)
- Stage: [www-vmllabs.vmlstage.com](http://www-vmllabs.vmlstage.com)
- Production: [www.vmllabs.com](http://www.vmllabs.com)

### CI/CD 

Jenkins job is located in [https://jenkins.vmlhosting.com/](https://jenkins.vmlhosting.com/) - [Jenkins Job](https://jenkins.vmlhosting.com/job/www.vmllabs.com/)