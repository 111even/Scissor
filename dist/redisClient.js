"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
// Use environment variables for Redis connection configuration
const redisClient = new ioredis_1.default({
    host: process.env.REDIS_HOST || '127.0.0.1', // Provide a fallback string
    port: parseInt(process.env.REDIS_PORT || '8000', 10), // Ensure port is always a number
    password: process.env.REDIS_PASSWORD || '', // Provide a fallback string
});
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});
exports.default = redisClient;
