const shortid = require('shortid');
const urlModel = require('../models/urlModel');

class UrlService {
  encodeUrl(originalUrl) {
    const shortCode = shortid.generate();
    const shortUrl = `http://localhost:3001/${shortCode}`;
    return urlModel.createUrl(originalUrl, shortUrl);
  }

  decodeUrl(shortCode) {
    const urlEntry = urlModel.getUrlByShortCode(shortCode);
    if (urlEntry) {
      urlModel.incrementVisitCount(shortCode);
      return urlEntry.originalUrl;
    }
    return null;
  }

  getUrlStats(shortCode) {
    return urlModel.getUrlStats(shortCode);
  }

  getAllUrls() {
    return urlModel.getAllUrls();
  }

  searchUrls(query) {
    return urlModel.searchUrls(query);
  }
}

module.exports = new UrlService();