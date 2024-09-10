# Create an IAM role for the EKS cluster
resource "aws_iam_role" "eks_role" {
  name = "eks-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "eks.amazonaws.com"
        }
      },
    ]
  })
}

# Attach the AmazonEKSClusterPolicy to the IAM role
resource "aws_iam_role_policy_attachment" "eks_policy" {
  role       = var.cluster_role_arn
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}

# Attach the necessary policies to the node group IAM role
resource "aws_iam_role_policy_attachment" "eks_worker_node_policy" {
  role       = var.node_role_arn
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

# Attach the EKSCNIPolicy to the node group IAM role
resource "aws_iam_role_policy_attachment" "eks_cni_policy" {
  role       = var.node_role_arn
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
}

# # Attach the EC2ContainerRegistryReadOnly policy to the node group IAM role
# resource "aws_iam_role_policy_attachment" "ec2_container_registry_readonly" {
#   role       = aws_iam_role.node_role.name
#   policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
# }
