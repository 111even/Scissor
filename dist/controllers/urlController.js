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
exports.getAllUrls = exports.getUrl = exports.shortenUrl = void 0;
const valid_url_1 = __importDefault(require("valid-url"));
const shortid_1 = __importDefault(require("shortid"));
const qrcode_1 = __importDefault(require("qrcode"));
const urlModel_1 = __importDefault(require("../models/urlModel"));
const redisClient_1 = __importDefault(require("../redisClient"));
const baseUrl = 'http://localhost:3000/api/url';
const shortenUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { longUrl, customCode } = req.body;
    // Check if the long URL is valid
    if (!valid_url_1.default.isUri(longUrl)) {
        return res.status(400).json('Invalid URL');
    }
    // Generate or use custom code
    const urlCode = customCode || shortid_1.default.generate();
    try {
        // Check if the custom code is already taken
        if (customCode) {
            const existingUrl = yield urlModel_1.default.findOne({ urlCode });
            if (existingUrl) {
                return res.status(400).json('Custom URL code already exists');
            }
        }
        // Check Redis cache for the long URL
        const cachedUrl = yield redisClient_1.default.get(longUrl);
        if (cachedUrl) {
            return res.json(JSON.parse(cachedUrl));
        }
        // Check if the long URL already exists in the database
        let url = yield urlModel_1.default.findOne({ longUrl });
        if (url) {
            // Cache the found URL
            yield redisClient_1.default.set(longUrl, JSON.stringify(url));
            return res.json(url);
        }
        else {
            const shortUrl = `${baseUrl}/${urlCode}`;
            // Create and save the new URL document
            url = new urlModel_1.default({
                longUrl,
                shortUrl,
                urlCode,
                date: new Date(),
                clicks: 0 // Initialize clicks property
            });
            yield url.save();
            // Cache the new URL
            yield redisClient_1.default.set(longUrl, JSON.stringify(url));
            // Generate QR code
            const qrCode = yield qrcode_1.default.toDataURL(shortUrl);
            res.json({ url, qrCode });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});
exports.shortenUrl = shortenUrl;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.params;
        // Check Redis cache for the URL code
        const cachedUrl = yield redisClient_1.default.get(code);
        if (cachedUrl) {
            const url = JSON.parse(cachedUrl);
            url.clicks++;
            yield urlModel_1.default.findOneAndUpdate({ urlCode: code }, { clicks: url.clicks });
            return res.redirect(url.longUrl);
        }
        const url = yield urlModel_1.default.findOne({ urlCode: code });
        if (url) {
            // Cache the found URL
            yield redisClient_1.default.set(code, JSON.stringify(url));
            url.clicks++;
            yield url.save();
            return res.redirect(url.longUrl);
        }
        else {
            return res.status(404).json('No URL found');
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});
exports.getUrl = getUrl;
const getAllUrls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urls = yield urlModel_1.default.find();
        res.json(urls);
    }
    catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});
exports.getAllUrls = getAllUrls;
