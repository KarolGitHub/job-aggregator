// Fetcher for Pracuj.pl
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function fetchPracujPl() {
  try {
    const url = 'https://www.pracuj.pl/praca/frontend;kw';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const offers = [];
    $('.results__list .offer').each((i, el) => {
      offers.push({
        source: 'Pracuj.pl',
        title: $(el).find('.offer__title').text().trim(),
        location: $(el).find('.offer__location').text().trim(),
        salary: $(el).find('.offer__salary').text().trim() || 'N/A',
        description: $(el).find('.offer__description').text().trim(),
        url: $(el).find('a').attr('href'),
        company: $(el).find('.offer__company').text().trim(),
        tech: [],
        remote: $(el).text().toLowerCase().includes('remote'),
      });
    });
    return offers;
  } catch (err) {
    console.error('Pracuj.pl fetch error:', err);
    return [];
  }
};