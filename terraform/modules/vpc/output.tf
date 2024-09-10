output "vpc_id" {
  value = aws_vpc.team1_vpc.id
}

output "subnet_ids" {
  value = [aws_subnet.team1_subnet_a.id, aws_subnet.team1_subnet_b.id]
}
