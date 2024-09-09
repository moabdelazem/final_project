terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

}

# Variables
provider "aws" {
  region = "us-east-1"
}

# Create a Security Group
resource "aws_security_group" "jenkins-sg" {
  name        = var.security_group_name
  description = "Allow inbound traffic"
  vpc_id      = var.vpc_id


  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Setup EC2 instance To Run Jenkins on it
resource "aws_instance" "jenkinsteam1_ec2" {
  ami             = var.ami_id
  instance_type   = var.instance_type
  security_groups = [aws_security_group.jenkins-sg.name]
  key_name        = var.key_name

  user_data = <<-EOF
                #!/bin/bash
                yum update -y
                sudo wget -O /etc/yum.repos.d/jenkins.repo \
                https://pkg.jenkins.io/redhat-stable/jenkins.repo
                sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
                sudo yum upgrade
                sudo dnf install java-17-amazon-corretto -y
                sudo yum install jenkins -y
                sudo systemctl enable jenkins
                sudo systemctl start jenkins
  EOF

  tags = {
    Name = "jenkinsteam1_ec2"
  }
}
