# # Handles the setup of the frontend. We can either choose to host it statically 
# # via S3 adn CloudFront or in an ECS container via the Dockerfile running nginx.

# # Running a build of the frontend when the Terraform script is executed
# # resource "null_resource" "build_frontend" {
# #     provisioner "local-exec" {
# #         command = <<-EOT
# #         cd ../frontend && npm i && npm run build
        
# #         # Add a check to ensure build completion
# #         if [ ! -d "../frontend/dist" ]; then
# #             echo "Build failed: dist directory not found"
# #             exit 1
# #         fi
# #         EOT
# #     }

# #     triggers = {
# #         always_run = "${timestamp()}"
# #     }
# # }

# # Updating the .env.production file with the backend Elastic IP address
# resource "local_file" "frontend_config" {
#     content  = <<-EOT
#         VITE_API_BASE_PATH=http://${aws_eip.backend_eip.public_ip}
#     EOT
#     filename = "${path.module}/../frontend/.env.production"

#     depends_on = [aws_eip.backend_eip]
# }


# # Provisioning just a basic S3 bucket 
# resource "aws_s3_bucket" "frontend" {
#     bucket = "${var.project_name}-frontend"
# }

# # Configuring the bucket to host a static website
# resource "aws_s3_bucket_website_configuration" "tailorwrite" {
#     bucket = aws_s3_bucket.frontend.id
#     index_document {
#         suffix = "index.html"
#     }
#     error_document {
#         key = "index.html"
#     }
# }

# # Applying the s3:GetObject policy to the bucket
# resource "aws_s3_bucket_policy" "bucket_policy" {
#     bucket = aws_s3_bucket.frontend.id
#     policy = jsonencode({
#         Version = "2012-10-17",
#         Statement = [
#             {
#                 Effect = "Allow",
#                 Principal = "*",
#                 Action = "s3:GetObject",
#                 Resource = "${aws_s3_bucket.frontend.arn}/*"
#             }
#         ]
#     })
# }

# # Configuring the bucket to allow public access
# resource "aws_s3_bucket_public_access_block" "public_access_block" {
#     bucket = aws_s3_bucket.frontend.id
#     block_public_acls       = false
#     block_public_policy     = false
#     ignore_public_acls      = false
#     restrict_public_buckets = false
# }

# # Uploading all files withing the frontend build folder

# # This module will determain the content type of the files being uploaded
# module "template_files" {
#     source = "hashicorp/dir/template"

#     base_dir = "${var.frontend_build_folder}"
# }

# resource "aws_s3_object" "upload_object" {
#     for_each = module.template_files.files

#     bucket   = aws_s3_bucket.frontend.id
#     key      = each.key
#     source   = each.value.source_path
#     etag     = each.value.digests.md5

#     content_type = each.value.content_type

#     # Ensure the upload occurs after the build
#     depends_on = [
#         local_file.frontend_config,
#         # null_resource.build_frontend,
#         # module.template_files
#     ]
# }




