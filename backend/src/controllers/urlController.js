const urlService = require('../services/urlService');

class UrlController {
  async encodeUrl(req, res) {
    try {
      const { originalUrl } = req.body;
      if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
      }
      
      const urlEntry = urlService.encodeUrl(originalUrl);
      res.json(urlEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async decodeUrl(req, res) {
    try {
      const { shortUrl } = req.body;
      if (!shortUrl) {
        return res.status(400).json({ error: 'Short URL is required' });
      }
      
      const shortCode = shortUrl.split('/').pop();
      const originalUrl = urlService.decodeUrl(shortCode);
      
      if (!originalUrl) {
        return res.status(404).json({ error: 'URL not found' });
      }
      
      res.json({ originalUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUrlStats(req, res) {
    try {
      const { url_path } = req.params;
      const stats = urlService.getUrlStats(url_path);
      
      if (!stats) {
        return res.status(404).json({ error: 'URL not found' });
      }
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllUrls(req, res) {
    try {
      const urls = urlService.getAllUrls();
      res.json(urls);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async searchUrls(req, res) {
    try {
      const { query } = req.query;
      if (!query || query.length < 3) {
        return res.status(400).json({ error: 'Query must be at least 3 characters long' });
      }
      
      const results = urlService.searchUrls(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async redirectToOriginalUrl(req, res) {
    try {
      const { url_path } = req.params;
      const originalUrl = urlService.decodeUrl(url_path);
      
      if (!originalUrl) {
        return res.status(404).json({ error: 'URL not found' });
      }
      
      res.redirect(originalUrl);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UrlController();