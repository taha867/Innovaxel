import express from 'express';
import {
    shortenUrl,
    getOriginalUrl,
    updateShortUrl,
    deleteShortUrl,
    getUrlStats
} from '../controllers/urlController.js';

const router = express.Router();

// Create a new short URL
router.post('/shorten', shortenUrl);

// Get original URL from short code
router.get('/shorten/:shortCode', getOriginalUrl);

// Update an existing short URL
router.put('/shorten/:shortCode', updateShortUrl);

// Delete a short URL
router.delete('/shorten/:shortCode', deleteShortUrl);

// Get statistics for a short URL
router.get('/shorten/:shortCode/stats', getUrlStats);

export default router; 