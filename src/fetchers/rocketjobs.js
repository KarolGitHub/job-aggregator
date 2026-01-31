// Fetcher for RocketJobs.pl
const axios = require('axios');
const RSSParser = require('rss-parser');

module.exports = async function fetchRocketJobs() {
  try {
    const parser = new RSSParser();
    const feed = await parser.parseURL('https://rocketjobs.pl/feed/frontend');
    return feed.items.map((item) => ({
      source: 'RocketJobs.pl',
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
    console.error('RocketJobs.pl fetch error:', err);
    return [];
  }
};
