# Contains configuration for the web scraping service, deployed as a Lambda function
# and exposed via an API Gateway endpoint.

# ========== Configuring the Lambda function ==========

# Creating a data source to archive the Lambda function code
data "archive_file" "lambda_package" {
    type        = "zip"
    source_dir  = "../services/web_scraping"
    output_path = "lambda_function_payload.zip"
}

# Creating the Lambda function
resource "aws_lambda_function" "web_scraping_lambda" {
    filename            = "lambda_function_payload.zip"
    function_name       = "${var.project_name}-webScrapeJobDescription"
    role                = "arn:aws:iam::061628070952:role/LabRole"
    handler             = "lambda_function.lambda_handler"
    runtime             = "python3.11"
    source_code_hash    = data.archive_file.lambda_package.output_base64sha256
}

# Provision a Function URL
resource "aws_lambda_function_url" "function_url" {
    function_name      = aws_lambda_function.web_scraping_lambda.function_name
    authorization_type = "NONE"
    
    cors {
        allow_credentials = true
        allow_origins     = ["*"]
        allow_methods     = ["*"]
        allow_headers     = ["date", "keep-alive", "Content-Type", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Access-Control-Allow-Methods"]
        expose_headers    = ["keep-alive", "date"]
    }
}

output "lambda_function_url" {
    value = aws_lambda_function_url.function_url.function_url
}

# ========== Pasting the Lambda Function URL into backend .env ==========
resource "null_resource" "update_backend_config_with_lambda_url" {
    triggers = {
        lambda_function_url = aws_lambda_function_url.function_url.function_url
    }

    provisioner "local-exec" {
        command = <<-EOT
        #!/bin/bash
        ENV_FILE="${path.module}/../frontend/.env"
        NEW_URL="VITE_LAMBDA_WEB_SCRAPING_URL=${aws_lambda_function_url.function_url.function_url}"
        
        # Check if the file exists
        if [ -f "$${ENV_FILE}" ]; then
            # If VITE_LAMBDA_WEB_SCRAPING_URL exists, replace it; otherwise, append it
            if grep -q "^VITE_LAMBDA_WEB_SCRAPING_URL=" "$${ENV_FILE}"; then
            sed -e "s|^VITE_LAMBDA_WEB_SCRAPING_URL=.*|$${NEW_URL}|" "$${ENV_FILE}" > "$${ENV_FILE}.tmp" && mv "$${ENV_FILE}.tmp" "$${ENV_FILE}"
            else
            echo "$${NEW_URL}" >> "$${ENV_FILE}"
            fi
        else
            echo "$${NEW_URL}" > "$${ENV_FILE}"
        fi
        EOT
    }

    depends_on = [aws_lambda_function_url.function_url]
}

# ========== Configuring the API Gateway ==========

# Provisioning the API gateway 
# resource "aws_api_gateway_rest_api" "my_api" {
#     name = "${var.project_name}-webscraping-api"
#     description = "API Gateway for the web scraping service deployed as a Lambda function"

#     # Set the endpoint configuration to regional, meaning that the API Gateway will 
#     # be deployed in the same region as the rest of the infrastructure
#     endpoint_configuration {
#         types = ["REGIONAL"]
#     }
# }



# # Provisioning the API Gateway resource for the root path of the API
# resource "aws_api_gateway_resource" "root" {
#     rest_api_id = aws_api_gateway_rest_api.my_api.id
#     parent_id = aws_api_gateway_rest_api.my_api.root_resource_id
#     path_part = "scrape"
# }


# # Configuring a POST method on the API gateway resource 
# resource "aws_api_gateway_method" "proxy" {
#     rest_api_id = aws_api_gateway_rest_api.my_api.id
#     resource_id = aws_api_gateway_resource.root.id
#     http_method = "POST"
#     authorization = "NONE"
# }



# resource "aws_api_gateway_integration" "lambda_integration" {
#     rest_api_id = aws_api_gateway_rest_api.my_api.id
#     resource_id = aws_api_gateway_resource.root.id
#     http_method = aws_api_gateway_method.proxy.http_method
#     integration_http_method = "POST"
#     type = "AWS"
#     uri = aws_lambda_function.web_scraping_lambda.invoke_arn
# }



# resource "aws_api_gateway_method_response" "proxy" {
#     rest_api_id = aws_api_gateway_rest_api.my_api.id
#     resource_id = aws_api_gateway_resource.root.id
#     http_method = aws_api_gateway_method.proxy.http_method
#     status_code = "200"
# }



# resource "aws_api_gateway_integration_response" "proxy" {
#     rest_api_id = aws_api_gateway_rest_api.my_api.id
#     resource_id = aws_api_gateway_resource.root.id
#     http_method = aws_api_gateway_method.proxy.http_method
#     status_code = aws_api_gateway_method_response.proxy.status_code

#     depends_on = [
#         aws_api_gateway_method.proxy,
#         aws_api_gateway_integration.lambda_integration
#     ]
# }

# # Configuring an OPTIONS method on the API gateway resource



# # 
# resource "aws_api_gateway_deployment" "deployment" {
#     depends_on = [
#         aws_api_gateway_integration.lambda_integration,
#         # aws_api_gateway_integration.options_integration, # Add this line
#     ]

#     rest_api_id = aws_api_gateway_rest_api.my_api.id
#     stage_name = "dev"
# }



# resource "aws_lambda_function_url" "test_live" {
#     function_name      = aws_lambda_function.web_scraping_lambda.function_name
#     qualifier          = "my_alias"
#     authorization_type = "AWS_IAM"

#     cors {
#         allow_credentials = true
#         allow_origins     = ["*"]
#         allow_methods     = ["*"]
#         allow_headers     = ["date", "keep-alive"]
#         expose_headers    = ["keep-alive", "date"]
#         max_age           = 86400
#     }
# }


# Source: 
#  - https://spacelift.io/blog/terraform-api-gateway




# # Zip the Lambda function code
# data "archive_file" "lambda_zip" {
#     type        = "zip"
#     source_dir  = "../services/web_scraping"
#     output_path = "lambda_function_payload.zip"
# }

# # Zip the Lambda layer (dependencies)
# data "archive_file" "lambda_layer_zip" {
#     type        = "zip"
#     source_dir  = "../services/web_scraping/dependencies"
#     output_path = "lambda_layer.zip"
# }

# # Lambda layer for dependencies
# resource "aws_lambda_layer_version" "dependencies_layer" {
#     filename            = "lambda_layer.zip"
#     layer_name          = "web_scraper_dependencies"
#     compatible_runtimes = ["python3.9"]  # Adjust as needed
# }

# # Lambda function
# resource "aws_lambda_function" "web_scraper" {
#     filename         = "lambda_function_payload.zip"
#     function_name    = "web_scraper_function"
#     role             = "arn:aws:iam::061628070952:role/LabRole"   # aws_iam_role.lambda_role.arn
#     handler          = "lambda_function.lambda_handler"
#     source_code_hash = data.archive_file.lambda_zip.output_base64sha256
#     runtime          = "python3.9"  # Adjust as needed

#     layers = [aws_lambda_layer_version.dependencies_layer.arn]

#     environment {
#         variables = {
#         # Add any environment variables your function needs
#         }
#     }
# }

# # API Gateway
# resource "aws_api_gateway_rest_api" "scraper_api" {
#     name = "web_scraper_api"
# }

# resource "aws_api_gateway_resource" "scraper_resource" {
#     rest_api_id = aws_api_gateway_rest_api.scraper_api.id
#     parent_id   = aws_api_gateway_rest_api.scraper_api.root_resource_id
#     path_part   = "scrape"
# }

# resource "aws_api_gateway_method" "scraper_method" {
#     rest_api_id   = aws_api_gateway_rest_api.scraper_api.id
#     resource_id   = aws_api_gateway_resource.scraper_resource.id
#     http_method   = "POST"
#     authorization = "NONE"
# }

# resource "aws_api_gateway_integration" "lambda_integration" {
#     rest_api_id = aws_api_gateway_rest_api.scraper_api.id
#     resource_id = aws_api_gateway_resource.scraper_resource.id
#     http_method = aws_api_gateway_method.scraper_method.http_method

#     integration_http_method = "POST"
#     type                    = "AWS_PROXY"
#     uri                     = aws_lambda_function.web_scraper.invoke_arn
# }

# resource "aws_api_gateway_deployment" "scraper_deployment" {
#     depends_on = [aws_api_gateway_integration.lambda_integration]

#     rest_api_id = aws_api_gateway_rest_api.scraper_api.id
#     stage_name  = "prod"
# }

# # Lambda permission for API Gateway
# resource "aws_lambda_permission" "api_gateway_lambda" {
#     statement_id  = "AllowAPIGatewayInvoke"
#     action        = "lambda:InvokeFunction"
#     function_name = aws_lambda_function.web_scraper.function_name
#     principal     = "apigateway.amazonaws.com"

#     source_arn = "${aws_api_gateway_rest_api.scraper_api.execution_arn}/*/*"
# }

# # Output the API Gateway URL
# output "api_gateway_url" {
#     value = "${aws_api_gateway_deployment.scraper_deployment.invoke_url}${aws_api_gateway_resource.scraper_resource.path}"
# }
