# Create a VPC
resource "aws_vpc" "team1-vpc" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "team1-vpc"
  }
}

