# No variables needed for now, but can be extended later
variable "cluster_role_arn" {
  type    = string
  default = "arn:aws:iam::123456789012:role/eks-role"
}

# Define the ARN of the IAM role for the EKS node group
variable "node_role_arn" {
  type    = string
  default = "arn:aws:iam::123456789012:role/eks-node-role"
}
