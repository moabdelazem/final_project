# Define the VPC ID as a variable
variable "vpc_id" {
  description = "The ID of the VPC where the security group will be created."
  type        = string
  default     = "vpc-0fe163bae4f0c0242"
}

# Define the AMI as a variable
variable "ami_id" {
  description = "AMI ID to launch the EC2 instance"
  type        = string
  default     = "ami-0182f373e66f89c85"
}

# Define the instance type as a variable
variable "instance_type" {
  description = "The EC2 instance type"
  type        = string
  default     = "t2.micro"
}

# Define the key name as a variable
variable "key_name" {
  description = "Key pair to use for the EC2 instance"
  type        = string
  default     = "jenkins-key"
}

# Define the Jenkins security group name as a variable
variable "security_group_name" {
  description = "Name of the security group for Jenkins"
  type        = string
  default     = "jenkins-sg"
}
