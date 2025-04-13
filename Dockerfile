# Use official Node.js image as the base image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Playwright dependencies
RUN npx playwright install

# Install Allure commandline globally
RUN npm install -g allure-commandline

# Install Playwright Allure reporter
RUN npm install allure-playwright --save-dev

# Copy the rest of the application files
COPY . .

# Set the environment variables (if needed)
ENV BASE_URL=https://conduit-api.bondaracademy.com/api

# Command to run Playwright tests and generate Allure results
CMD npx playwright test --reporter=list,allure-playwright
