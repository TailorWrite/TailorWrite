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


# Defining an EC2 instance for to clone repo, build and run the backend service
resource "aws_instance" "backend" {
    ami           = "ami-033067239f2d2bfbc"
    instance_type = "t2.micro"
    key_name      = aws_key_pair.tailorwrite_key_pair.key_name
    subnet_id     = aws_subnet.public_subnets[0].id
    vpc_security_group_ids = [
        aws_security_group.allow_ssh.id,
        aws_security_group.allow_http.id,
        aws_security_group.allow_flask.id,
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



# Creating an ECR repository for the backend service
# resource "aws_ecr_repository" "repo" {
#     name = "${var.project_name}-repo"
# }


# # Creating an ECS cluster for the backend service
# resource "aws_ecs_cluster" "main" {
#     name = "${var.project_name}-backend-cluster"
# }

# # Creating a task definition for the backend service
# # This task definition will be used by the ECS service to run the backend service
# # The task definition specifies the container image, CPU and memory requirements, and port mappings
# # The container image is pulled from the ECR repository created earlier
# resource "aws_ecs_task_definition" "app" {
#     family                   = var.project_name
#     network_mode             = "awsvpc"
#     requires_compatibilities = ["FARGATE"]
#     cpu                      = var.ecs_task_cpu
#     memory                   = var.ecs_task_memory
#     execution_role_arn       = "arn:aws:iam::061628070952:role/LabRole"

#     container_definitions = jsonencode([
#         {
#             name  = var.project_name
#             image = "${aws_ecr_repository.repo.repository_url}:latest"
#             # The port mapping specifies the port on which the container will listen for requests
#             portMappings = [
#                 {
#                     containerPort = var.backend_port    # The port on which the container listens
#                     hostPort      = var.backend_port    # The port on which the host (Fargate) listens
#                 }
#             ]
#         }
#     ])
# }

# # Creating a security group for the ECS tasks to restrict access to the ALB only
# resource "aws_security_group" "ecs_tasks" {
#     name        = "${var.project_name}-ecs-tasks-sg"
#     description = "Allow inbound access from the ALB only"
#     vpc_id      = aws_vpc.main.id

#     # Setting up ingress rules to allow traffic from the ALB
#     ingress {
#         protocol        = "tcp"
#         from_port       = var.backend_port
#         to_port         = var.backend_port
#         security_groups = [aws_security_group.alb.id]
#     }

#     # Allowing egress traffic to all IP addresses
#     egress {
#         protocol    = "-1"
#         from_port   = 0
#         to_port     = 0
#         cidr_blocks = ["0.0.0.0/0"]
#     }
# }

# # Creating an ECS service for the backend service
# # The ECS service will run the backend service using the task definition created earlier
# # The service will be associated with the ALB target group to route traffic to the backend service
# resource "aws_ecs_service" "main" {
#     name            = "${var.project_name}-backend-service"
#     cluster         = aws_ecs_cluster.main.id
#     task_definition = aws_ecs_task_definition.app.arn
#     desired_count   = var.desired_count
#     launch_type     = "FARGATE"

#     # Configuring the network settings for the ECS service
#     # The service will be deployed in the private subnets
#     network_configuration {
#         security_groups = [aws_security_group.ecs_tasks.id]
#         # subnets         = aws_subnet.private_subnets[*].id
#         subnets         = aws_subnet.public_subnets[*].id
#     }

#     # Configuring the load balancer settings for the ECS service
#     load_balancer {
#         target_group_arn = aws_alb_target_group.app.id
#         container_name   = var.project_name
#         container_port   = var.backend_port
#     }

#     depends_on = [aws_alb_listener.front_end]
# }