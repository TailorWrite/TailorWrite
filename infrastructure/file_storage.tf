# Contains the configuration for the file storage bucket. This bucket will be 
# used to store generated cover letters and files uploaded by users. 

# Previsoning file storage with S3
resource "aws_s3_bucket" "file-storage" {
    bucket = "${var.project_name}-file-storage"

    tags = {
        Name        = "${var.project_name}-file-storage"
        Environment = "Development"
    }
}

resource "aws_s3_bucket_public_access_block" "file-storage-public-access-block" {
    bucket = aws_s3_bucket.file-storage.bucket
    block_public_acls       = true
    block_public_policy     = true
    ignore_public_acls      = true
    restrict_public_buckets = true
}







