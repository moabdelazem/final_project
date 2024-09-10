# Output the IAM role ARN
output "eks_role_arn" {
  value = var.cluster_role_arn
}

# Output the node role ARN
output "node_role_arn" {
  value = var.node_role_arn
}
