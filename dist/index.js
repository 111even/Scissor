"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const urlRoutes_1 = require("./routes/urlRoutes");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Connect to the Redis server
client.on('error', (err) => console.error('Redis Client Error', err));
client.connect();
// Test the Redis connection
function testRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.set('key', 'value');
            const value = yield client.get('key');
            console.log(value); // should log 'value'
        }
        catch (err) {
            console.error('Error:', err);
        }
    });
}
testRedis();
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);
app.use(express_1.default.json());
app.use('/api', urlRoutes_1.urlRouter);
// Add the root route
app.get('/', (req, res) => {
    res.send('Welcome to the URL Shortener API. I tried so hard but ran into some challenges; I’m confident the groundwork is solid for future improvements.');
});
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect('mongodb://localhost:27017/scissor')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
