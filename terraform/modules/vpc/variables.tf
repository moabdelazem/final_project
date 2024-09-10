# Purpose: Define the input variables for the VPC module

# Define the input variables for the VPC module
# Define CIDR block for the VPC
variable "cidr_block" {
  description = "The CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

# Define CIDR block for the subnet A called `team1_subnet_a`
variable "subnet_a_cidr_block" {
  description = "The CIDR block for the subnet A"
  type        = string
  default     = "10.0.1.0/24"
}

# Define CIDR block for the subnet A called `team1_subnet_b`
variable "team1_subnet_b" {
  description = "The CIDR block for the subnet A"
  type        = string
  default     = "10.0.2.0/24"
}

# Define the availability zone for the subnet A called `team1_subnet_a`
variable "subnet_a_availability_zone" {
  description = "The availability zone for the subnet A"
  type        = string
  default     = "us-east-1a"
}

# Define the availability zone for the subnet B called `team1_subnet_b`
variable "subnet_b_availability_zone" {
  description = "The availability zone for the subnet B"
  type        = string
  default     = "us-east-1b"
}
