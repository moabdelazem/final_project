# Purpose: Define outputs for the Terraform module.

# Output the VPC ID
output "vpc_id" {
  value = module.vpc.vpc_id
}

# Output the Cluster Endpoints 
# output "eks_cluster_endpoint" {
#   value = module.eks.cluster_endpoint
# }
