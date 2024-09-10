# Description: Define the variables for the Terraform configuration

# Define The Default Region 
variable "region" {
  description = "The AWS region to deploy to"
  default     = "us-east-1"
}

# Set CIDR block for the VPC
variable "vpc_cidr_block" {
  description = "The CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}
