// Fetcher for LinkedIn Jobs (scraping, limited)
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function fetchLinkedInJobs() {
  try {
    const url = 'https://www.linkedin.com/jobs/search/?keywords=frontend';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const offers = [];
    $('.jobs-search__results-list li').each((i, el) => {
      offers.push({
        source: 'LinkedIn',
        title: $(el).find('.base-search-card__title').text().trim(),
        location: $(el).find('.job-search-card__location').text().trim(),
        salary: 'N/A',
        description: $(el).find('.base-search-card__description').text().trim(),
        url: $(el).find('a').attr('href'),
        company: $(el).find('.base-search-card__subtitle').text().trim(),
        tech: [],
        remote: $(el).text().toLowerCase().includes('remote'),
      });
    });
    return offers;
  } catch (err) {
    console.error('LinkedIn Jobs fetch error:', err);
    return [];
  }
};