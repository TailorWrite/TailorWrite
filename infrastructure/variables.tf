# Contains all the variables used in the Terraform configuration. This centralises 
# configuration inputs, making it easy to adjust parameters without touching the
# resource definitions.


variable "profile" {
    description = "AWS CLI profile to use"
    default     = "cosc349"
}

variable "access_key" {
    description = "AWS access key"
}

variable "secret_key" {
    description = "AWS secret key"
}

variable "session_token" {
    description = "AWS session token"
}


# Defining the region and availability zones
variable "aws_region" {
    description = "AWS region to deploy resources"
    default     = "us-west-2"
}

variable "region_azs" {
    type        = list(string)
    description = "Availability zones in the selected region"
    default     = ["us-west-2a", "us-west-2b"]
}


# Defining the public and private subnets 
variable "public_subnet_cidrs" {
    type            = list(string)
    description     = "CIDR block for the public subnet"
    default         = ["10.0.1.0/24", "10.0.2.0/24"]
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
    default     = "https://github.com/JamesRobionyRogers/Assignment02-CloudDeployment.git"
}

variable "repo_name" {
    description = "Name of the cloned repository"
    default     = "Assignment02-CloudDeployment"
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

variable "backend_image" {
    description = "Docker image for the backend service"
    default     = "jamesrobionyrogers/tailorwrite-backend"
}

variable "ecs_task_cpu" {
  description = "The amount of CPU to allocate for the ECS task"
  default     = "256"
}

variable "ecs_task_memory" {
  description = "The amount of memory to allocate for the ECS task"
  default     = "512"
}

variable "desired_count" {
  description = "The desired number of tasks to run"
  default     = 1
}