# Docker Setup for React Frontend Application

## Prerequisites

- Install [Docker](https://www.docker.com/get-started)
- Install [Docker Compose](https://docs.docker.com/compose/install/)

## Dockerfile

Create a `Dockerfile` in the root directory of your project:

```dockerfile
# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before other files (to leverage caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port on which the app runs
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]
```

## .dockerignore

Create a `.dockerignore` file to prevent unnecessary files from being copied to the container:

```plaintext
node_modules
dist
.git
Dockerfile
.dockerignore
```

## Running the Application in Docker

### 1. Build the Docker Image

```sh
docker build -t my-react-app .
```

### 2. Run the Container

```sh
docker run -p 5173:5173 my-react-app
```

Access the application at **http://localhost:5173**

## Using Docker Compose (Optional)

Create a `docker-compose.yml` file for easier management:

```yaml
version: "3.8"
services:
  react-app:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    command: ["npm", "run", "dev"]
```

### Running with Docker Compose

```sh
docker-compose up --build
```

#### If permission denied use

```sh
sudo docker compose up --build
```

#### check for the container images using

```sh
docker ps
```

### Stopping the Application

```sh
docker-compose down
```

## Cleaning Up Docker Resources

- Stop a running container:
  ```sh
  docker stop <container_id>
  ```
- Remove a container:
  ```sh
  docker rm <container_id>
  ```
- Remove an image:
  ```sh
  docker rmi my-react-app
  ```
