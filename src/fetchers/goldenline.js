// Fetcher for GoldenLine Jobs
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function fetchGoldenLineJobs() {
  try {
    const url = 'https://www.goldenline.pl/praca/frontend';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const offers = [];
    $('.job-offer-list .job-offer').each((i, el) => {
      offers.push({
        source: 'GoldenLine',
        title: $(el).find('.job-offer-title').text().trim(),
        location: $(el).find('.job-offer-location').text().trim(),
        salary: $(el).find('.job-offer-salary').text().trim() || 'N/A',
        description: $(el).find('.job-offer-description').text().trim(),
        url: $(el).find('a').attr('href'),
        company: $(el).find('.job-offer-company').text().trim(),
        tech: [],
        remote: $(el).text().toLowerCase().includes('remote'),
      });
    });
    return offers;
  } catch (err) {
    console.error('GoldenLine Jobs fetch error:', err);
    return [];
  }
};
