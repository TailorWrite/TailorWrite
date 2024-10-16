# Configuration for the virtual networks of this infrastructure. This includes all
# VPC, subnet, route table and internet gateway configurations.

# VPC configuration: https://spacelift.io/blog/terraform-aws-vpc
resource "aws_vpc" "main" {
    cidr_block           = "10.0.0.0/16"    # Default CIDR block for VPCs
    enable_dns_support   = true
    enable_dns_hostnames = true

    tags = {
        Name = "${var.project_name}-vpc"
    }
}

# Public subnet for the ECS instance to be deployed
resource "aws_subnet" "public_subnets" {
    count                   = length(var.public_subnet_cidrs)
    vpc_id                  = aws_vpc.main.id
    cidr_block              = element(var.public_subnet_cidrs, count.index)
    availability_zone       = element(var.region_azs, count.index)
    map_public_ip_on_launch = true
    
    tags = {
        Name = "Public Subnet ${count.index + 1}"
    }
}

# resource "aws_subnet" "private_subnets" {
#     count             = length(var.private_subnet_cidrs)
#     vpc_id            = aws_vpc.main.id
#     cidr_block        = element(var.private_subnet_cidrs, count.index)
#     availability_zone = element(var.region_azs, count.index)
    
#     tags = {
#         Name = "Private Subnet ${count.index + 1}"
#     }
# }


# Internet Gateway for internet access
resource "aws_internet_gateway" "gw" {
    vpc_id = aws_vpc.main.id

    tags = {
        Name = "${var.project_name}-igw"
    }
}


# Creating a route table to allow internet access to tge public subnet within the VPC
# Second route table as creating the VPC creates a default route table
resource "aws_route_table" "public" {
    vpc_id = aws_vpc.main.id

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.gw.id
    }

    tags = {
        Name = "${var.project_name}-rt"
    }
}

# Assocating the public subnets with the route table
resource "aws_route_table_association" "public_subnet_asso" {
    count           = length(var.public_subnet_cidrs)
    subnet_id       = element(aws_subnet.public_subnets[*].id, count.index)
    route_table_id  = aws_route_table.public.id
}


