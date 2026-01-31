// Fetcher for NoFluffJobs
const axios = require('axios');

module.exports = async function fetchNoFluffJobs() {
  try {
    // NoFluffJobs public API endpoint for jobs (frontend)
    const url = 'https://nofluffjobs.com/api/search/posting?criteria=frontend';
    const response = await axios.get(url);
    // Map to unified offer format
    return response.data.postings.map(offer => ({
      source: 'NoFluffJobs',
      title: offer.title,
      location: offer.city || offer.region || 'Remote',
      salary: offer.salary_from && offer.salary_to ? `${offer.salary_from}–${offer.salary_to} ${offer.salary_currency}` : 'N/A',
      description: offer.description,
      url: offer.url,
      company: offer.company,
      tech: offer.technology,
      remote: offer.remote,
    }));
  } catch (err) {
    console.error('NoFluffJobs fetch error:', err);
    return [];
  }
};
