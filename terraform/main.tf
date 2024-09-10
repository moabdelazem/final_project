# Call the VPC module
module "vpc" {
  source     = "./modules/vpc"
  cidr_block = var.vpc_cidr_block
}

# Call the IAM module
module "iam" {
  source = "./modules/iam"
}

# Call the EKS module
module "eks" {
  source           = "./modules/eks"
  subnet_ids       = module.vpc.subnet_ids
  cluster_role_arn = module.iam.eks_role_arn
}
