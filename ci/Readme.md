# Jenkins EC2 Instance Setup with Terraform

This Terraform project provisions an EC2 instance running Jenkins on AWS. It creates a security group to allow necessary inbound traffic and launches an EC2 instance configured to install and start Jenkins using `user_data`. The instance is configured to use Amazon Linux, and Java 17 (Amazon Corretto) is installed to meet Jenkins' requirements.

## Prerequisites

Before using this project, ensure you have the following:

- **AWS Account**: You need an AWS account with access credentials (AWS Access Key and Secret Key).
- **Terraform**: Installed Terraform CLI. You can download and install it from [here](https://www.terraform.io/downloads.html).
- **AWS CLI**: Installed AWS CLI and configured with your credentials. Instructions for setup can be found [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

## Project Structure

### File Explanations

1. **main.tf**:

   - Provisions a security group for the Jenkins EC2 instance.
   - Launches an EC2 instance using Amazon Linux 2.
   - Installs Jenkins and Java 17 using `user_data` on the instance.

2. **variables.tf**:

   - Contains all customizable variables such as VPC ID, AMI ID, instance type, and key pair.
   - These variables allow flexibility when provisioning resources without changing the core `main.tf` file.

3. **outputs.tf**:
   - Provides useful information after the infrastructure is provisioned, such as the EC2 instance's public IP, public DNS, and security group ID.

## Variables

The project makes use of the following variables to customize the infrastructure:

| Variable              | Description                                           | Default Value             |
| --------------------- | ----------------------------------------------------- | ------------------------- |
| `vpc_id`              | The ID of the VPC where the security group is created | `"vpc-0fe163bae4f0c0242"` |
| `ami_id`              | The AMI ID used to launch the EC2 instance            | `"ami-0182f373e66f89c85"` |
| `instance_type`       | The instance type for the EC2                         | `"t2.micro"`              |
| `key_name`            | The name of the key pair to access the instance       | `"jenkins-key"`           |
| `security_group_name` | The name of the security group                        | `"jenkins-sg"`            |

You can modify these values in the `variables.tf` file as per your setup.

## Outputs

After provisioning, the following information will be displayed:

- **`jenkins_security_group_id`**: The ID of the security group created for Jenkins.
- **`jenkins_instance_public_ip`**: The public IP address of the Jenkins EC2 instance.
- **`jenkins_instance_public_dns`**: The public DNS of the EC2 instance, useful for accessing Jenkins.
- **`jenkins_instance_id`**: The ID of the EC2 instance running Jenkins.

## Setup Instructions

1. **Clone this repository** or copy the Terraform files into a directory on your local machine.

2. **Customize Variables**:

   - Open the `variables.tf` file and adjust the variable values according to your AWS environment. For example, you can change the VPC ID, AMI ID, instance type, and key name.

3. **Initialize Terraform**:

   ```bash
   terraform init
   ```

4. **Apply Terraform**
   ```bash
   terraform apply
   ```
5. **Destroy Terraform**
   ```bash
   terraform destroy
   ```
