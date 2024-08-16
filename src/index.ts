import express from 'express';
import mongoose from 'mongoose';
import { urlRouter } from './routes/urlRoutes';
import rateLimit from 'express-rate-limit';
import { createClient } from 'redis';

const client = createClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the Redis server
client.on('error', (err) => console.error('Redis Client Error', err));
client.connect();

// Test the Redis connection
async function testRedis() {
    try {
        await client.set('key', 'value');
        const value = await client.get('key');
        console.log(value); // should log 'value'
    } catch (err) {
        console.error('Error:', err);
    }
}

testRedis();

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(limiter);
app.use(express.json());
app.use('/api', urlRouter);

// Add the root route
app.get('/', (req, res) => {
    res.send('Welcome to the URL Shortener API.  I tried so hard but ran into some challenges; I’m confident the groundwork is solid for future improvements.');
});

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/scissor')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
