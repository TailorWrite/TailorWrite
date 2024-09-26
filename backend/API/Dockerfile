# Description: Dockerfile for the backend application with LaTeX support
# Building: docker build --no-cache --tag "job-tracker-backend" .
# Running: docker run -d -p 5001:5001 --name backend job-tracker-backend
# Stopping: docker stop backend

# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Install TeX Live and necessary packages for LaTeX
RUN apt-get update && apt-get install -y \
    texlive-latex-base \
    texlive-fonts-recommended \
    texlive-fonts-extra \
    texlive-latex-extra \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

    
RUN pdflatex --version 

# Copy the rest of the application code into the container
COPY . .

# Expose the port that the app runs on
EXPOSE 5001

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Run the Flask application
CMD ["flask", "run", "--port=5001", "--debug"]


# # Description: Dockerfile for the backend application
# # Building: docker build --no-cache --tag "job-tracker-backend" .
# # Running: docker run -d -p 5001:5001 --name backend job-tracker-backend
# # Stopping: docker stop backend

# # Use an official Python runtime as the base image
# FROM python:3.9-slim

# # Install dependencies
# RUN apt-get update && \
#     apt-get install -y \
#     wget \
#     perl \
#     xz-utils \
#     && rm -rf /var/lib/apt/lists/*

# # Install TeX Live
# RUN wget https://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz && \
#     tar -xzf install-tl-unx.tar.gz && \
#     cd install-tl-* && \
#     echo "selected_scheme scheme-basic" >> texlive.profile && \
#     echo "tlpdbopt_install_docfiles 0" >> texlive.profile && \
#     echo "tlpdbopt_install_srcfiles 0" >> texlive.profile && \
#     ./install-tl --profile=texlive.profile && \
#     cd .. && \
#     rm -rf install-tl-* install-tl-unx.tar.gz

# # Add TeX Live to PATH
# ENV PATH="/usr/local/texlive/2024/bin/x86_64-linux:${PATH}"

# # Install additional LaTeX packages
# RUN tlmgr install \
#     fontawesome5 \
#     latex-base \
#     fonts-recommended \
#     fonts-extra \
#     latex-extra

# # Set the working directory in the container
# WORKDIR /app

# # Copy the requirements file into the container
# COPY requirements.txt .

# # Install the required packages
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy the rest of the application code into the container
# COPY . .

# # Expose the port that the app runs on
# EXPOSE 5001

# # Set environment variables
# ENV FLASK_APP=app.py
# ENV FLASK_RUN_HOST=0.0.0.0

# # Run the Flask application
# CMD ["flask", "run", "--port=5001", "--debug"]