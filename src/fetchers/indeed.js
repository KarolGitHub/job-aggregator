// Fetcher for Indeed.pl
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function fetchIndeed() {
  try {
    const url = 'https://pl.indeed.com/jobs?q=frontend';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const offers = [];
    $('.jobsearch-ResultsList .result').each((i, el) => {
      offers.push({
        source: 'Indeed.pl',
        title: $(el).find('.jobTitle').text().trim(),
        location: $(el).find('.companyLocation').text().trim(),
        salary: $(el).find('.salary-snippet').text().trim() || 'N/A',
        description: $(el).find('.job-snippet').text().trim(),
        url: 'https://pl.indeed.com' + $(el).find('a').attr('href'),
        company: $(el).find('.companyName').text().trim(),
        tech: [],
        remote: $(el).text().toLowerCase().includes('remote'),
      });
    });
    return offers;
  } catch (err) {
    console.error('Indeed.pl fetch error:', err);
    return [];
  }
};