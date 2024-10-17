# # # Includes the configuration for the Supabase services. 

# # Defining an Elastic IP for the supabase EC2 instance to ensure a static IP
# resource "aws_eip" "supabase_eip" {
#     instance = aws_instance.supabase.id
#     domain = "vpc"
    
#     tags = {
#         Name = "Supabase-EIP"
#     }
# }

# # Defining an EC2 instance to clone repo, build and run the supabase backend service
# # via docker compose 
# resource "aws_instance" "supabase" {
#     ami           = "ami-033067239f2d2bfbc"
#     instance_type = "t3.small"
#     key_name      = aws_key_pair.tailorwrite_key_pair.key_name
#     subnet_id     = aws_subnet.public_subnets[0].id
#     vpc_security_group_ids = [
#         aws_security_group.allow_ssh.id,
#         aws_security_group.allow_http.id,
#         aws_security_group.allow_supabase_dashboard.id,
#     ]

#     # Help running docker in EC2 instance: https://stackoverflow.com/a/63516616
#     user_data     = <<-EOF
#         #!/bin/bash
#         sudo yum update -y
#         sudo yum install git docker -y
#         sudo systemctl enable docker
#         sudo systemctl start docker

#         sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
#         sudo chmod +x /usr/local/bin/docker-compose
#         docker-compose version

#         git clone ${var.github_repo}
#         cd ${var.repo_name}/database
#         docker-compose up -d --build
#     EOF

#     tags = {
#         Name = "${var.project_name}-supabase"
#     }
# }

