# Manages IAM roles, security groups, and any other security-related configurations
#  required by your services.

# Configuring the AWS key pair for accessing the database instance
resource "aws_key_pair" "tailorwrite_key_pair" {
    key_name   = "tailorwrite_key_pair"
    public_key = file("./keys/tailorwrite_key_pair.pub")
}

resource "aws_security_group" "tailorwrite_backend_sg" {
    name        = "tailorwrite_backend_sg"
    description = "Allowing inbound and outbound traffic for the TailorWrite backend service"
    vpc_id      = aws_vpc.main.id

    ingress {
        description = "SSH from anywhere"
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        description = "HTTP from anywhere"
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        description = "Allow all outbound traffic"
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

# Defining the security groups for the backend service
# resource "aws_security_group" "allow_ssh" {
#     name        = "allow_ssh"
#     description = "Allow inbound SSH traffic"
#     vpc_id      = aws_vpc.main.id

#     ingress {
#         description = "SSH from anywhere"
#         from_port   = 22
#         to_port     = 22
#         protocol    = "tcp"
#         cidr_blocks = ["0.0.0.0/0"]
#     }

#     egress {
#         description = "Allow all outbound traffic"
#         from_port   = 0
#         to_port     = 0
#         protocol    = "-1"
#         cidr_blocks = ["0.0.0.0/0"]
#     }

#     tags = {
#         Name = "Allow SSH traffic from anywhere & allow all outbound traffic"
#     }
# }

# resource "aws_security_group" "allow_http" {
#     name        = "allow_http"
#     description = "Allow inbound HTTP traffic"
#     vpc_id = aws_vpc.main.id

#     ingress {
#         description = "HTTP from anywhere"
#         from_port   = 80
#         to_port     = 80
#         protocol    = "tcp"
#         cidr_blocks = ["0.0.0.0/0"]
#     }

#     tags = {
#         Name = "Allow HTTP traffic from anywhere"
#     }
# }

# resource "aws_security_group" "allow_flask" {
#     name        = "allow_flask"
#     description = "Allow inbound traffic to the Flask application"
#     vpc_id      = aws_vpc.main.id

#     ingress {
#         description = "Flask application traffic"
#         from_port   = var.backend_port
#         to_port     = var.backend_port
#         protocol    = "tcp"
#         cidr_blocks = ["0.0.0.0/0"]
#     }

#     tags = {
#         Name = "Allow traffic to the Flask application"
#     }
# }

# resource "aws_security_group" "allow_supabase_dashboard" {
#     name        = "allow_supabase_dashboard"
#     description = "Allow inbound traffic to the Supabase dashboard"
#     vpc_id      = aws_vpc.main.id

#     ingress {
#         description = "Supabase dashboard traffic"
#         from_port   = 8000
#         to_port     = 8000
#         protocol    = "tcp"
#         cidr_blocks = ["0.0.0.0/0"]
#     }
# }