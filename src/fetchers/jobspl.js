// Fetcher for Jobs.pl
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function fetchJobsPl() {
  try {
    const url = 'https://www.jobs.pl/praca/frontend';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const offers = [];
    $('.job-listing .job-offer').each((i, el) => {
      offers.push({
        source: 'Jobs.pl',
        title: $(el).find('.job-title').text().trim(),
        location: $(el).find('.job-location').text().trim(),
        salary: $(el).find('.job-salary').text().trim() || 'N/A',
        description: $(el).find('.job-description').text().trim(),
        url: $(el).find('a').attr('href'),
        company: $(el).find('.job-company').text().trim(),
        tech: [],
        remote: $(el).text().toLowerCase().includes('remote'),
      });
    });
    return offers;
  } catch (err) {
    console.error('Jobs.pl fetch error:', err);
    return [];
  }
};