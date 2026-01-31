// Main entry point
const fetchers = require('./fetchers');
const normalizer = require('./normalizer');
const ai = require('./ai');
const filters = require('./filters');
const storage = require('./storage');
const notifier = require('./notifier');
const config = require('./config');

async function run() {
  // 1. Fetch job offers
  // 2. Normalize data
  // 3. AI classification
  // 4. Deterministic filters
  // 5. Deduplication
  // 6. Daily summary output
  // ...implementation...
}

run();