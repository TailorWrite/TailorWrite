# Defines the outputs from your Terraform deployment, such as URLs or IDs of the
# created resources.

# Frontend specific outputs
# output "frontend_website_url" {
#     description = "URL of the frontend website"
#     value       = aws_s3_bucket_website_configuration.tailorwrite.website_endpoint
# }

# Backend specific outputs (EC2 - currently working)
output "backend_public_ip" {
    value       = aws_eip.backend_eip.public_ip
    description = "Public IP address of the backend EC2 instance"
}

# Database specific outputs (RDS)
# output "supabase_public_ip" {
#     value       = aws_eip.supabase_eip.public_ip
#     description = "Public IP address of the Supabase EC2 instance"
# }