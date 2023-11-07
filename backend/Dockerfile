# Use Ubuntu 16.04 as the base image
FROM ubuntu:16.04

# Set environment variables if needed
ENV NODE_ENV=production

# Update the package manager and install necessary packages
RUN apt-get update && \
    apt-get install -y git docker.io docker-compose gcc make g++ && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
    echo "deb https://deb.nodesource.com/node_14.x $(lsb_release -sc) main" > /etc/apt/sources.list.d/nodesource.list && \
    echo "deb-src https://deb.nodesource.com/node_14.x $(lsb_release -sc) main" >> /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

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

# Expose the port your application listens on
EXPOSE 3000

# Optionally, change ownership of the working directory to a non-root user
# RUN chown -R node /usr/src/app

# Optionally, switch to a non-root user for running the application
# USER node

# Command to start your Node.js application
CMD ["node", "index.js"]

# Create an SQL initialization script
RUN echo "CREATE TABLE IF NOT EXISTS mytable (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL);" > init.sql

# Start MySQL and run your application
CMD service mysql start && your-application-start-command
