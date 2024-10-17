# Contains the ECS configuration for the backend service, including task definitions, 
# services, and cluster configurations.

# Defining an Elastic IP for the backend EC2 instance to ensutre a static IP
resource "aws_eip" "backend_eip" {
    instance = aws_instance.backend.id
    domain = "vpc"
    
    tags = {
        Name = "Backend-EIP"
    }
}

# Adding a DATABASE_URL entry into the ./backend/api/.env file for the backend service
# resource "null_resource" "update_backend_config" {
#     triggers = {
#         supabase_url = "${aws_eip.supabase_eip.public_ip}:8000"
#     }

#     provisioner "local-exec" {
#         command = <<-EOT
#         #!/bin/bash
#         ENV_FILE="${path.module}/../backend/API/.env"
#         NEW_URL="SUPABASE_URL=http://${aws_eip.supabase_eip.public_ip}:8000"
        
#         # Check if the file exists
#         if [ -f "$${ENV_FILE}" ]; then
#             # If SUPABASE_URL exists, replace it; otherwise, append it
#             if grep -q "^SUPABASE_URL=" "$${ENV_FILE}"; then
#             sed -e "s|^SUPABASE_URL=.*|$${NEW_URL}|" "$${ENV_FILE}" > "$${ENV_FILE}.tmp" && mv "$${ENV_FILE}.tmp" "$${ENV_FILE}"
#             else
#             echo "$${NEW_URL}" >> "$${ENV_FILE}"
#             fi
#         else
#             echo "$${NEW_URL}" > "$${ENV_FILE}"
#         fi
#         EOT
#     }

#     depends_on = [aws_eip.supabase_eip]
# }


# Defining an EC2 instance for to clone repo, build and run the backend service
resource "aws_instance" "backend" {
    ami           = "ami-084e237ffb23f8f97"
    instance_type = "t2.micro"
    key_name      = aws_key_pair.tailorwrite_key_pair.key_name
    subnet_id     = aws_subnet.public_subnets[0].id
    vpc_security_group_ids = [
        aws_security_group.tailorwrite_backend_sg.id,
        # aws_security_group.allow_ssh.id,
        # aws_security_group.allow_http.id,
        # aws_security_group.allow_flask.id,
    ]

    # Help running docker in EC2 instance: https://stackoverflow.com/a/63516616
    user_data     = <<-EOF
        #!/bin/bash
        sudo yum update -y
        sudo yum install git docker -y
        sudo systemctl enable docker
        sudo systemctl start docker

        git clone ${var.github_repo}
        cd ${var.repo_name}/backend/API
        docker build -t tailorwrite-backend .
        docker run -d -p 80:${var.backend_port} tailorwrite-backend
    EOF

    tags = {
        Name = "${var.project_name}-backend"
    }
}