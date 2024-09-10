# Create VPC Called `team1_vpc`
resource "aws_vpc" "team1_vpc" {
  cidr_block = var.cidr_block

  tags = {
    Name = "team1_vpc"
  }
}

# Create Subnet Called `team1_subnet_a`
resource "aws_subnet" "team1_subnet_a" {
  vpc_id            = aws_vpc.team1_vpc.id
  cidr_block        = var.subnet_a_cidr_block
  availability_zone = var.subnet_a_availability_zone

  tags = {
    Name = "team1_subnet_a"
  }
}

# Create Subnet Called `team1_subnet_b`
resource "aws_subnet" "team1_subnet_b" {
  vpc_id            = aws_vpc.team1_vpc.id
  cidr_block        = var.team1_subnet_b
  availability_zone = var.subnet_b_availability_zone

  tags = {
    Name = "team1_subnet_b"
  }
}

# Create Internet Gateway
resource "aws_internet_gateway" "team1_igw" {
  vpc_id = aws_vpc.team1_vpc.id

  tags = {
    Name = "team1_igw"
  }
}

# Create NAT Gateway
# First We need to create an Elastic IP
resource "aws_eip" "team1_eip" {
  tags = {
    Name = "team1_eip"
  }
}

# Create NAT Gateway
resource "aws_nat_gateway" "team1_nat_gw" {
  allocation_id = aws_eip.team1_eip.id
  subnet_id     = aws_subnet.team1_subnet_a.id

  tags = {
    Name = "team1_nat_gw"
  }
}

# Create Route Table For Subnet A
resource "aws_route_table" "team1_route_table_a" {
  vpc_id = aws_vpc.team1_vpc.id

  route {
    cidr_block                 = "0.0.0.0/0"
    gateway_id                 = aws_internet_gateway.team1_igw.id
    nat_gateway_id             = aws_nat_gateway.team1_nat_gw.id
    carrier_gateway_id         = ""
    destination_prefix_list_id = ""
    egress_only_gateway_id     = ""
    ipv6_cidr_block            = ""
    local_gateway_id           = ""
    network_interface_id       = ""
    transit_gateway_id         = ""
    vpc_endpoint_id            = ""
    vpc_peering_connection_id  = ""
  }
}

# Create Route Table For Subnet B
resource "aws_route_table" "team1_route_table_b" {
  vpc_id = aws_vpc.team1_vpc.id

  route {
    cidr_block                 = "0.0.0.0/0"
    gateway_id                 = aws_internet_gateway.team1_igw.id
    nat_gateway_id             = aws_nat_gateway.team1_nat_gw.id
    carrier_gateway_id         = ""
    destination_prefix_list_id = ""
    egress_only_gateway_id     = ""
    ipv6_cidr_block            = ""
    local_gateway_id           = ""
    network_interface_id       = ""
    transit_gateway_id         = ""
    vpc_endpoint_id            = ""
    vpc_peering_connection_id  = ""
  }
}

# Create Route Table Association For Subnet A
resource "aws_route_table_association" "team1_route_table_association_a" {
  subnet_id      = aws_subnet.team1_subnet_a.id
  route_table_id = aws_route_table.team1_route_table_a.id
}

# Create Route Table For Subnet B
resource "aws_route_table_association" "team1_route_table_association_b" {
  subnet_id      = aws_subnet.team1_subnet_b.id
  route_table_id = aws_route_table.team1_route_table_b.id
}
