# Description: Define the input variables for the EKS module

# Define Subnet IDs
variable "subnet_ids" {
  description = "The IDs of the subnets for the EKS cluster"
  type        = list(string)
}

# Define the ARN of the IAM role for the EKS cluster
variable "cluster_role_arn" {
  description = "The ARN of the IAM role for the EKS cluster"
  type        = string
  default     = "arn:aws:iam::123456789012:role/eks-role"
}
