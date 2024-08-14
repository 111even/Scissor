import { Request, Response } from 'express';
import validUrl from 'valid-url';
import shortid from 'shortid';
import QRCode from 'qrcode';
import Url, { IUrl } from '../models/urlModel';
import redisClient from '../redisClient';

const baseUrl = 'http://localhost:3000/api/url';

export const shortenUrl = async (req: Request, res: Response) => {
  const { longUrl } = req.body; // Only use longUrl, remove customCode

  // Check if the long URL is valid
  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json('Invalid URL');
  }

  // Generate a unique code
  const urlCode = shortid.generate();

  try {
    // Check Redis cache for the long URL
    const cachedUrl = await redisClient.get(longUrl);
    if (cachedUrl) {
      return res.json(JSON.parse(cachedUrl));
    }

    // Check if the long URL already exists in the database
    let url = await Url.findOne({ longUrl });

    if (url) {
      // Cache the found URL
      await redisClient.set(longUrl, JSON.stringify(url));
      return res.json(url);
    } else {
      const shortUrl = `${baseUrl}/${urlCode}`;

      // Create and save the new URL document
      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date(),
        clicks: 0 // Initialize clicks property
      });

      await url.save();

      // Cache the new URL
      await redisClient.set(longUrl, JSON.stringify(url));

      // Generate QR code
      const qrCode = await QRCode.toDataURL(shortUrl);

      res.json({ url, qrCode });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
};

export const getUrl = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    // Check Redis cache for the URL code
    const cachedUrl = await redisClient.get(code);
    if (cachedUrl) {
      const url: IUrl = JSON.parse(cachedUrl);
      url.clicks++;
      await Url.findOneAndUpdate({ urlCode: code }, { clicks: url.clicks });
      return res.redirect(url.longUrl);
    }

    const url = await Url.findOne({ urlCode: code });

    if (url) {
      // Cache the found URL
      await redisClient.set(code, JSON.stringify(url));

      url.clicks++;
      await url.save();
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No URL found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
};

export const getAllUrls = async (req: Request, res: Response) => {
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
};
