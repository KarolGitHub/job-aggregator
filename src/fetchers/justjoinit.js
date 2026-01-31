// Fetcher for JustJoinIt
const axios = require('axios');

module.exports = async function fetchJustJoinIt() {
  try {
    // JustJoinIt public API endpoint for jobs
    const url = 'https://justjoin.it/api/offers?category=frontend';
    const response = await axios.get(url);
    // Map to unified offer format
    return response.data.map((offer) => ({
      source: 'JustJoinIt',
      title: offer.title,
      location: offer.city || offer.street || 'Remote',
      salary:
        offer.salary_from && offer.salary_to
          ? `${offer.salary_from}–${offer.salary_to} ${offer.salary_currency}`
          : 'N/A',
      description: offer.description,
      url: offer.link,
      company: offer.company_name,
      tech: offer.skills ? offer.skills.map((s) => s.name) : [],
      remote: offer.remote,
    }));
  } catch (err) {
    console.error('JustJoinIt fetch error:', err);
    return [];
  }
};
