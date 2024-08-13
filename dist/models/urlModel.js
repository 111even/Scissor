"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const urlSchema = new mongoose_1.Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    urlCode: { type: String, required: true },
    date: { type: Date, required: true }, // Correct the type to Date
    clicks: { type: Number, default: 0 }
});
exports.default = (0, mongoose_1.model)('Url', urlSchema);
