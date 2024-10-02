# Manages IAM roles, security groups, and any other security-related configurations
#  required by your services.

# Configuring the AWS key pair for accessing the database instance
resource "aws_key_pair" "tailorwrite_key_pair" {
    key_name   = "tailorwrite_key_pair"
    public_key = file("./keys/tailorwrite_key_pair.pub")
}

# Defining the security groups for the backend service
resource "aws_security_group" "allow_ssh" {
    name        = "allow_ssh"
    description = "Allow inbound SSH traffic"
    vpc_id      = aws_vpc.main.id

    ingress {
        description = "SSH from anywhere"
        from_port   = 22
        to_port     = 22
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

    tags = {
        Name = "Allow SSH traffic from anywhere & allow all outbound traffic"
    }
}

resource "aws_security_group" "allow_http" {
    name        = "allow_http"
    description = "Allow inbound HTTP traffic"
    vpc_id = aws_vpc.main.id

    ingress {
        description = "HTTP from anywhere"
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = "Allow HTTP traffic from anywhere"
    }
}

resource "aws_security_group" "allow_flask" {
    name        = "allow_flask"
    description = "Allow inbound traffic to the Flask application"
    vpc_id      = aws_vpc.main.id

    ingress {
        description = "Flask application traffic"
        from_port   = var.backend_port
        to_port     = var.backend_port
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = "Allow traffic to the Flask application"
    }
}


# # Configuring the IAM role for the ECS task execution
# resource "aws_iam_role" "ecs_task_execution_role" {
#     name = "${var.project_name}-ecs-task-execution-role"

#     assume_role_policy = jsonencode({
#         Version = "2012-10-17"
#         Statement = [
#         {
#             Action = "sts:AssumeRole"
#             Effect = "Allow"
#             Principal = {
#             Service = "ecs-tasks.amazonaws.com"
#             }
#         }
#         ]
#     })
# }

# # Attaching the AmazonECSTaskExecutionRolePolicy to the ECS task execution role
# resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
#     role       = aws_iam_role.ecs_task_execution_role.name
#     policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
# }


# # ALB security Group: Edit to restrict access to the application
# resource "aws_security_group" "lb" {
#     name        = "cb-load-balancer-security-group"
#     description = "controls access to the ALB"
#     vpc_id      = aws_vpc.main.id

#     # Restricting traffic coming in to only the backend port
#     ingress {
#         protocol    = "tcp"
#         from_port   = var.backend_port
#         to_port     = var.backend_port
#         cidr_blocks = ["0.0.0.0/0"]
#     }

#     # Allowing service access to all IP addresses
#     egress {
#         from_port   = 0
#         to_port     = 0
#         protocol    = "-1"                  # All protocols
#         cidr_blocks = ["0.0.0.0/0"]         # All IP addresses
#     }
# }

# # Traffic to the ECS cluster should only come from the ALB
# resource "aws_security_group" "ecs_tasks" {
#     name        = "cb-ecs-tasks-security-group"
#     description = "allow inbound access from the ALB only"
#     vpc_id      = aws_vpc.main.id

#     # Restricting traffic coming in to only the backend port
#     ingress {
#         protocol        = "tcp"
#         from_port       = var.backend_port
#         to_port         = var.backend_port
#         security_groups = [aws_security_group.lb.id]
#     }

#     # Allowing service access to all IP addresses
#     egress {
#         from_port   = 0
#         to_port     = 0
#         protocol    = "-1"                  # All protocols
#         cidr_blocks = ["0.0.0.0/0"]         # All IP addresses
#     }
# }

# Sources: 
# - Using Terraform and Fargate to create Amazon’s ECS: https://medium.com/@olayinkasamuel44/using-terraform-and-fargate-to-create-amazons-ecs-e3308c1b9166