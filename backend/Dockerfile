# Use Ubuntu 16.04 as the base image
FROM ubuntu:16.04

# Set environment variables if needed
ENV NODE_ENV=production

# Update the package manager and install necessary packages
RUN apt-get update -y
RUN apt-get install -y nginx git mysql-server build-essential g++ curl

# Install nodejs(node.js 14)
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Configure MySQL
ENV MYSQL_ROOT_PASSWORD=my-secret-pw
ENV MYSQL_DATABASE=mydb

# Create the working directory
WORKDIR /usr/src/app    

# Copy package.json and package-lock.json for dependency installation
COPY ["package.json", "package-lock.json*", "./"]

# Install dependencies (production only)
RUN npm install --production --silent

# Copy the application code into the container
RUN git clone 'https://github.com/SSMYJAY/demo-repository.git'

# Create an SQL initialization script
RUN echo "CREATE TABLE IF NOT EXISTS mytable (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL);" > init.sql

# Expose the port your application listens on: 3010 (C/C++), 80 (Web server), 3306 (MySQL), 3000 (Node.js)
EXPOSE 3010 80 3306 3000

# Command to start your Node.js application and MySQL
CMD service mysql start && node index.js
