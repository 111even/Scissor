"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const urlRoutes_1 = require("./routes/urlRoutes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;

app.use(body_parser_1.default.json());
app.use('/api/url', urlRoutes_1.urlRouter);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the URL Shortener API');
});

mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect('mongodb://localhost:27017/scissor')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
