# Scissor URL Shortening Service

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

## Introduction

**Scissor** is a simple and efficient URL shortening service that allows users to shorten long URLs, customize shortened URLs, generate QR codes for URLs, track URL analytics, and view link history. Inspired by the principle of brevity, Scissor aims to disrupt the URL-shortening industry and provide a powerful alternative to services like bit.ly and ow.ly.

## Features

- **URL Shortening**: Automatically generate a short URL for a given long URL.
- **Custom URLs**: Allow users to customize their shortened URLs.
- **QR Code Generation**: Generate and download QR codes for shortened URLs.
- **Analytics**: Track clicks on shortened URLs and view detailed analytics.
- **Link History**: View history of all created shortened URLs.

## Technologies

- **Node.js**: JavaScript runtime environment.
- **TypeScript**: Typed superset of JavaScript.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Redis**: In-memory data structure store for caching.
- **Jest**: Testing framework.
- **Mongoose**: MongoDB object modeling tool.
- **ioredis**: Redis client for Node.js.
- **shortid**: URL-friendly unique ID generator.
- **valid-url**: URL validation library.
- **QRCode**: QR code generation library.

## Installation

1. **Clone the repository**:

   git clone https://github.com/111even/scissor.git
   cd scissor

2. **Install dependencies**:

   npm install

3. **Set up environment variables**:
   Create a .env file in the root directory and configure the following variables:

   PORT=3000
   MONGO_URI=mongodb://localhost:27017/scissor
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379

4. **Start the development server**:

   npm run dev

## Usage

Once the server is up and running, you can start using the Scissor URL Shortening Service.

- **Shorten a URL**: Send a POST request to `/api/shorten` with a `url` parameter.
- **Generate a Custom URL**: Include the desired custom short code in the POST request to `/api/shorten`.
- **Get Analytics**: Send a GET request to `/api/analytics/:shortCode` to view analytics for a specific shortened URL.
- **View Link History**: Send a GET request to `/api/history` to view all the shortened URLs.

## API Endpoints

- **POST `/api/shorten`**: Shorten a URL or create a custom shortened URL.
  - **Request Body**:
    {
      "url": "https://example.com",
      "customCode": "myCustomCode" // optional
    }
  - **Response**:
    {
      "shortUrl": "http://localhost:3000/myCustomCode"
    }

- **GET `/api/:shortCode`**: Redirect to the original URL using the short code.
  - **Example**: `/api/abc123` will redirect to the original URL associated with `abc123`.

- **GET `/api/analytics/:shortCode`**: Get analytics for a shortened URL.
  - **Response**:
    {
      "clicks": 150,
      "lastAccessed": "2024-08-15T12:30:00Z"
    }

- **GET `/api/history`**: Get the history of all shortened URLs.
  - **Response**:
    [
      {
        "shortCode": "abc123",
        "originalUrl": "https://example.com",
        "clicks": 150
      },
      {
        "shortCode": "xyz789",
        "originalUrl": "https://another.com",
        "clicks": 75
      }
    ]

## Testing

To run the tests, use the following command:

npm test

The tests are written using Jest and cover all the key functionalities of the Scissor URL Shortening Service.

## Configuration

- **MongoDB Configuration**:
  - Ensure that MongoDB is running and the `MONGO_URI` in your `.env` file is correctly pointing to your MongoDB instance.

- **Redis Configuration**:
  - Make sure Redis is running, and the `REDIS_HOST` and `REDIS_PORT` in your `.env` file are correctly set.

## Troubleshooting

- **Common Issues**:
  - **Server Not Starting**: Ensure that all environment variables are correctly set in the `.env` file.
  - **Database Connection Errors**: Verify that MongoDB is running and accessible via the URI provided in the `.env` file.
  - **Redis Connection Errors**: Make sure Redis is running and the correct host and port are specified in the `.env` file.

- **Port Conflicts**:
  - If the default ports are in use, update the `PORT`, `REDIS_PORT`, or MongoDB port in the `.env` file.

- **Redis Not Running**:
  - If Redis fails to start, check for port conflicts or missing Redis configurations. You can also try running Redis on a different port.
