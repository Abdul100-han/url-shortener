class UrlModel {
    constructor() {
        this.urls = [];
        this.urlStats = {};
      }
    
      createUrl(originalUrl, shortUrl) {
        const shortCode = shortUrl.split('/').pop();
        const urlEntry = {
          originalUrl,
          shortUrl,
          shortCode,  // Add this line
          createdAt: new Date(),
          visits: 0
        };
        this.urls.push(urlEntry);
        this.urlStats[shortCode] = {  // Use shortCode as key
          visits: 0,
          lastAccessed: null,
          createdAt: new Date()
        };
        return urlEntry;
      }
    
      getUrlByShortCode(shortCode) {  // Change parameter name
        return this.urls.find(url => url.shortCode === shortCode);
      }
    
  
    getAllUrls() {
      return this.urls;
    }
  
    incrementVisitCount(shortUrl) {
      const url = this.urls.find(url => url.shortUrl.includes(shortUrl));
      if (url) {
        url.visits++;
        this.urlStats[shortUrl].visits++;
        this.urlStats[shortUrl].lastAccessed = new Date();
      }
      return url;
    }
  
    getUrlStats(shortUrl) {
      return this.urlStats[shortUrl] || null;
    }
  
    searchUrls(query) {
      if (query.length < 3) return [];
      return this.urls.filter(url => 
        url.originalUrl.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
  
  module.exports = new UrlModel();