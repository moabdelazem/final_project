# Output the security group ID
output "jenkins_security_group_id" {
  description = "The ID of the Jenkins security group"
  value       = aws_security_group.jenkins-sg.id
}

# Output the public IP of the EC2 instance
output "jenkins_instance_public_ip" {
  description = "The public IP of the EC2 instance running Jenkins"
  value       = aws_instance.jenkinsteam1_ec2.public_ip
}

# Output the public DNS of the EC2 instance
output "jenkins_instance_public_dns" {
  description = "The public DNS of the EC2 instance running Jenkins"
  value       = aws_instance.jenkinsteam1_ec2.public_dns
}

# Output the instance ID
output "jenkins_instance_id" {
  description = "The ID of the EC2 instance running Jenkins"
  value       = aws_instance.jenkinsteam1_ec2.id
}
