# Defines the outputs from your Terraform deployment, such as URLs or IDs of the
# created resources.

# output "backend_url" {
#   description = "URL of the backend service"
#   value       = aws_ecs_service.backend_service.load_balancer[0].dns_name
# }

# Frontend specific outputs
output "frontend_website_url" {
    description = "URL of the frontend website"
    value       = aws_s3_bucket_website_configuration.tailorwrite.website_endpoint
}

# Backend specific outputs (EC2 - currently working)
output "backend_public_ip" {
    value       = aws_eip.backend_eip.public_ip
    description = "Public IP address of the backend EC2 instance"
}

# output "backend_ec2_instance_public_ip" {
#     description = "Public IP address of the backend EC2 instance"
#     value       = aws_instance.backend.public_ip
# }

# Backend specific outputs (ECS - currently not working)
# output "alb_hostname" {
#     description = "The DNS name of the load balancer"
#     value       = aws_alb.main.dns_name
# }

# output "ecr_repository_url" {
#     description = "The URL of the ECR repository"
#     value       = aws_ecr_repository.repo.repository_url
# }

# output "backend_service_url" {
#     description = "URL of the backend service"
#     value       = aws_ecs_service.main.load_balancer[0].dns_name
# }

# Database specific outputs
