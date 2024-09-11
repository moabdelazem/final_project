# Create an Internet Gateway
resource "aws_internet_gateway" "team1-igw" {
  vpc_id = aws_vpc.team1-vpc.id

  tags = {
    Name = "team1-igw"
  }
}
