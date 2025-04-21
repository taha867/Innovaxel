import Url from '../models/Url.js';
import { nanoid } from 'nanoid';

// Create a new short URL
export const shortenUrl = async (req, res) => {
    try {
        console.log('Received request to shorten URL:', req.body);
        const { url } = req.body;
        
        if (!url) {
            console.log('URL is missing in request');
            return res.status(400).json({
                success: false,
                error: 'URL is required'
            });
        }

        // Create new URL document
        const newUrl = new Url({
            url,
            shortCode: nanoid(6)
        });

        console.log('Attempting to save URL:', newUrl);
        await newUrl.save();
        console.log('URL saved successfully');
        
        // Format response
        const response = {
            id: newUrl.id,
            url: newUrl.url,
            shortCode: newUrl.shortCode,
            createdAt: newUrl.createdAt,
            updatedAt: newUrl.updatedAt
        };

        res.status(201).json({
            success: true,
            data: response
        });
    } catch (error) {
        console.error('Error in shortenUrl:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }

        // Handle duplicate shortCode errors
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Short code already exists. Please try again.'
            });
        }

        // Handle other errors
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

// Get original URL from short code
export const getOriginalUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;
        
        const url = await Url.findOne({ shortCode });
        
        if (!url) {
            return res.status(404).json({
                success: false,
                error: 'URL not found'
            });
        }

        // Increment access count
        url.accessCount += 1;
        await url.save();

        // Return the URL information
        res.status(200).json({
            success: true,
            data: {
                id: url.id,
                url: url.url,
                shortCode: url.shortCode,
                createdAt: url.createdAt,
                updatedAt: url.updatedAt
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

// Update an existing short URL
export const updateShortUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const { url } = req.body;

        // Validate URL in request body
        if (!url) {
            return res.status(400).json({
                success: false,
                error: 'URL is required'
            });
        }

        const updatedUrl = await Url.findOneAndUpdate(
            { shortCode },
            { url },
            { 
                new: true, 
                runValidators: true,
                context: 'query'
            }
        );

        if (!updatedUrl) {
            return res.status(404).json({
                success: false,
                error: 'URL not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                id: updatedUrl.id,
                url: updatedUrl.url,
                shortCode: updatedUrl.shortCode,
                createdAt: updatedUrl.createdAt,
                updatedAt: updatedUrl.updatedAt
            }
        });
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }

        // Handle other errors
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

// Delete a short URL
export const deleteShortUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOneAndDelete({ shortCode });

        if (!url) {
            return res.status(404).json({
                success: false,
                error: 'URL not found'
            });
        }

        // Return 204 No Content for successful deletion
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

// Get statistics for a short URL
export const getUrlStats = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                success: false,
                error: 'URL not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                id: url.id,
                url: url.url,
                shortCode: url.shortCode,
                createdAt: url.createdAt,
                updatedAt: url.updatedAt,
                accessCount: url.accessCount
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};