# EKS Cluster For Team 1
# Create EKS Cluster Called team1-eks-cluster
resource "aws_eks_cluster" "team1_eks_cluster" {
  name     = "team1-eks-cluster"
  role_arn = var.cluster_role_arn

  vpc_config {
    subnet_ids = var.subnet_ids
  }

  # Make The EKS Cluster Depend On The IAM Role Policy Attachment 
  depends_on = [var.cluster_role_arn]
}

# Create EKS Node Group Called team1-eks-node-group
resource "aws_eks_node_group" "team1_eks_node_group" {
  cluster_name    = aws_eks_cluster.team1_eks_cluster.name
  node_group_name = "team1-eks-node-group"
  node_role_arn   = var.cluster_role_arn

  # Subnet IDs
  subnet_ids = var.subnet_ids

  capacity_type  = "ON_DEMAND"
  instance_types = ["t3.medium"]

  # Scaling Configuration
  # 1 for desired_size, max_size, and min_size
  scaling_config {
    desired_size = 1
    max_size     = 1
    min_size     = 1
  }

  labels = {
    role = "team1-eks-node-group"
  }

  #   # Make The EKS Node Group Depend On The IAM Role Policy Attachments
  #   depends_on = [
  #     aws_iam_role_policy_attachment.nodes-AmazonEKSWorkerNodePolicy,
  #     aws_iam_role_policy_attachment.nodes-AmazonEKS_CNI_Policy,
  #     aws_iam_role_policy_attachment.nodes-AmazonEC2ContainerRegistryReadOnly,
  #   ]
}
