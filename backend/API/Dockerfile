# Description: Dockerfile for the backend application with LaTeX support
# Building: docker build --no-cache --tag "job-tracker-backend" .
# Running: docker run -d -p 5001:5001 -v latex-data:/usr/local/texlive --name backend job-tracker-backend
# Stopping: docker stop backend

# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Install minimal TeX Live and necessary packages for LaTeX
RUN apt-get update && apt-get install -y \
    texlive-latex-base \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the rest of the application code into the container
COPY . .

# Expose the port that the app runs on
EXPOSE 5001

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Run the Flask application
CMD ["flask", "run", "--port=5001", "--debug"]