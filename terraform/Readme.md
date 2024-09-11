# Infrastructure Documentation

This document outlines the infrastructure modules used in our project.

## Table of Contents

1. [Overview](#overview)
2. [VPC Module](#vpc-module)
3. [IAM Module](#iam-module)
4. [EKS Module](#eks-module)

## Overview

Our infrastructure is defined using Terraform and consists of three main modules:

1. VPC (Virtual Private Cloud)
2. IAM (Identity and Access Management)
3. EKS (Elastic Kubernetes Service)

These modules are orchestrated in the main Terraform configuration to set up a complete infrastructure for running Kubernetes on AWS.

## VPC Module

### Source

```hcl
module "vpc" {
  source     = "./modules/vpc"
  cidr_block = var.vpc_cidr_block
}
```

### Description

The VPC module is responsible for creating the network infrastructure. It sets up a Virtual Private Cloud with the specified CIDR block.

### Inputs

- `cidr_block`: The CIDR block for the VPC, provided as a variable.

### Outputs

- `subnet_ids`: List of subnet IDs created within the VPC (used by the EKS module).

## IAM Module

### Source

```plaintext
module "iam" {
  source = "./modules/iam"
}
```

### Description

The IAM module manages Identity and Access Management resources. It creates the necessary roles and policies for other AWS services to interact securely.

### Outputs

- `eks_role_arn`: The ARN of the IAM role created for EKS (used by the EKS module).

## EKS Module

### Source

```plaintext
module "eks" {
  source           = "./modules/eks"
  subnet_ids       = module.vpc.subnet_ids
  cluster_role_arn = module.iam.eks_role_arn
}
```

### Description

The EKS module sets up an Elastic Kubernetes Service cluster. It uses the network infrastructure from the VPC module and the IAM role from the IAM module.

### Inputs

- `subnet_ids`: List of subnet IDs where the EKS cluster will be deployed (provided by the VPC module).
- `cluster_role_arn`: The ARN of the IAM role that the EKS cluster will assume (provided by the IAM module).

## Usage

To use this infrastructure, ensure you have Terraform installed and configured with appropriate AWS credentials. Then, you can initialize and apply the Terraform configuration:

```shellscript
terraform init
terraform apply
```

Make sure to review the planned changes before applying them to your AWS account.

## Variables

Ensure you have defined the following variables:

- `vpc_cidr_block`: The CIDR block for your VPC.

You can define these in a `variables.tf` file or provide them when running `terraform apply`.

## Customization

To customize this infrastructure, you can modify the individual modules in the `./modules` directory. Each module may have its own set of variables and outputs that you can adjust to fit your specific requirements.
