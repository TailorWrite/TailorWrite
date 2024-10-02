# # Includes the configuration for the Supabase services. 

# Provision an RDS Arora instance for the Supabase database


# # Connecting: `ssh -i ./key/tailorwrite_database_key_pair ec2-user@<instance-public-ip>`

# resource "aws_instance" "supabase_instance" {
#     ami           = "ami-0ebfd941bbafe70c6"     # Default free tier Amazon Linux 2023 AMI
#     instance_type = "t2.micro"
#     key_name      = aws_key_pair.database_key_pair.database_key_pair

#     # User Data Script to install Git, Docker, and Docker Compose, then clone the repository
#     user_data = <<-EOF
#         #!/bin/bash
#         # Update and install required packages
#         sudo yum update -y
#         sudo yum install -y git docker
#         sudo service docker start
#         sudo usermod -aG docker ec2-user

#         # Install Docker Compose
#         sudo curl -L "https://github.com/docker/compose/releases/download/v2.0.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
#         sudo chmod +x /usr/local/bin/docker-compose

#         # Clone your Git repository (replace with your repo URL)
#         git clone ${var.github_repo} /home/ec2-user

#         # Navigate to the cloned repository and run Docker Compose
#         cd /home/ec2-user/${var.repo_name}
#         docker-compose up -d --build
#     EOF

#     # Ensure that the instance has an IAM role if needed
#     iam_instance_profile = aws_iam_instance_profile.database_instance_role.name

#     tags = {
#         Name = "SupabaseInstance"
#     }
# }

# # IAM role and policy setup (if needed for other AWS resources)
# resource "aws_iam_role" "database_instance_role" {
#     name               = "database-instance-role"
#     assume_role_policy = jsonencode({
#         Version = "2012-10-17",
#         Statement = [{
#         Action    = "sts:AssumeRole",
#         Effect    = "Allow",
#         Principal = { Service = "ec2.amazonaws.com" }
#         }]
#     })
# }

# resource "aws_iam_instance_profile" "database_instance_role" {
#   name = "database-instance-profile"
#   role = aws_iam_role.database_instance_role.name
# }

