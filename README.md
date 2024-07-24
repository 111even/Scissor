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
   ```sh
   git clone https://github.com/111even/scissor.git
   cd scissor
