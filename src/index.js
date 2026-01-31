// Main entry point
const fetchers = require('./fetchers');
const normalizer = require('./normalizer');
const ai = require('./ai');
const filters = require('./filters');
const storage = require('./storage');
const notifier = require('./notifier');
const config = require('./config');

async function run() {
  // 1. Fetch job offers from all sources
  const sources = [
    require('./fetchers/nofluffjobs'),
    require('./fetchers/justjoinit'),
    // Add more fetchers here
  ];

  let allOffers = [];
  for (const fetcher of sources) {
    try {
      const offers = await fetcher();
      allOffers = allOffers.concat(offers);
    } catch (err) {
      console.error('Fetcher error:', err);
    }
  }

  console.log(`Fetched ${allOffers.length} job offers.`);

  // 2. Normalize data
  const normalizedOffers = allOffers.map(normalizer);
  console.log(`Normalized ${normalizedOffers.length} job offers.`);
  // Next: AI classification, filtering, etc.
}

run();
