// Fetcher for BulldogJob
const axios = require('axios');
const RSSParser = require('rss-parser');

module.exports = async function fetchBulldogJob() {
  try {
    const parser = new RSSParser();
    const feed = await parser.parseURL(
      'https://bulldogjob.pl/feeds/offers/frontend',
    );
    return feed.items.map((item) => ({
      source: 'BulldogJob',
      title: item.title,
      location: item.location || 'Remote',
      salary: item.salary || 'N/A',
      description: item.contentSnippet,
      url: item.link,
      company: item.creator,
      tech: [],
      remote: item.title.toLowerCase().includes('remote'),
    }));
  } catch (err) {
    console.error('BulldogJob fetch error:', err);
    return [];
  }
};
