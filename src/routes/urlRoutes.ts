import { Router } from 'express';
import { shortenUrl, getUrl, getAllUrls } from '../controllers/urlControllers';

const router = Router();

router.post('/shorten', shortenUrl);
router.get('/:code', getUrl);
router.post('/qrcode', getAllUrls);

export { router as urlRouter };
