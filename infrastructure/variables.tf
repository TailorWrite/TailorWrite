# Contains all the variables used in the Terraform configuration. This centralises 
# configuration inputs, making it easy to adjust parameters without touching the
# resource definitions.


variable "profile" {
    description = "AWS CLI profile to use"
    default     = "cosc349"
}

# variable "access_key" {
#     description = "AWS access key"
# }

# variable "secret_key" {
#     description = "AWS secret key"
# }

# variable "session_token" {
#     description = "AWS session token"
# }


# Defining the region and availability zones
variable "aws_region" {
    description = "AWS region to deploy resources"
    default     = "ap-southeast-2"
}

variable "region_azs" {
    type        = list(string)
    description = "Availability zones in the selected region"
    default     = ["ap-southeast-2a", "ap-southeast-2b"]
}


# Defining the public and private subnets 
variable "public_subnet_cidrs" {
    type            = list(string)
    description     = "CIDR block for the public subnet"
    default         = ["10.0.1.0/24"]
    # default         = ["10.0.1.0/24", "10.0.2.0/24"]
} 

variable "private_subnet_cidrs" {
    type            = list(string)
    description     = "CIDR block for the private subnet"
    default         = ["10.0.4.0/24", "10.0.5.0/24"]
}




# Defining the project name and GitHub repository
variable "project_name" {
    description = "Project name for resource naming"
    default     = "tailorwrite"
}

variable "github_repo" {
    description = "GitHub repository URL for the project"
    default     = "https://github.com/TailorWrite/TailorWrite.git"
}

variable "repo_name" {
    description = "Name of the cloned repository"
    default     = "TailorWrite"
}



# Frontend specific variables
variable "frontend_build_folder" {
    description = "Folder containing the frontend build"
    default     = "../frontend/dist"
}


# Backend specific variables
variable "backend_port" {
    description = "Port on which the backend server runs"
    default     = 5001
}