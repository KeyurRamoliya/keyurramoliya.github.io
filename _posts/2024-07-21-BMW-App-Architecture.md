---
layout: post
title: "BMW Connected Vehicle and App Experience Architecture"
categories:
- programming
- architecture
tags:
- Cloud
- Azure
- Kubernetes
- Service Fabric
- App Services
- Terraform
- BMW
- MINI
- Rolls Royce
- API Gateway
- Microservices
- Mobile Apps
- Microsoft Build 2024
---

Cloud-native architectures are always interesting.

Recently, in Microsoft Build 2024, BMW shared how their mobile apps are powered by Microsoft Azure.

Engineers from BMW have shown how their app architecture evolved from Azure App Services to Azure Service Fabric to Azure Kubernetes Service.

Interestingly, this is the same architecture being used in MINI and Rolls Royce apps.

Take a look at the diagram below to see their architecture.

## Architecture Evolution - 2014-16

- Azure App Services
- Web Apps and Azure Functions
- Custom API Gateway based on .NET
- Fully managed, scalable and high availability
- Cold start times and scaling costs

|![BMW](/assets/images/2024/07/21/1.png)|
|:--:| 
|*Architecture Evolution - 2014-16*|

## Architecture Evolution - 2016-18

- Azure Service Fabric enabled a microservices based architecture
- Gradual migration to Service Fabric
- Introduction of API management

|![BMW](/assets/images/2024/07/21/2.png)|
|:--:| 
|*Architecture Evolution - 2016-18*|

## Architecture Evolution - 2018-24

- Azure Kubernetes Service
- Kubernetes based architecture
- Retired app services and service fabric
- Azure virtual machine scale sets for microservices, logging and monitoring
- All resources are created and maintained using Terraform

|![BMW](/assets/images/2024/07/21/3.png)|
|:--:| 
|*Architecture Evolution - 2018-24*|

Thank you for reading.
