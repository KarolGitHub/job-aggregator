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
    require('./fetchers/bulldogjob'),
    require('./fetchers/goldenline'),
    require('./fetchers/indeed'),
    require('./fetchers/jobspl'),
    require('./fetchers/justjoinit'),
    require('./fetchers/linkedin'),
    require('./fetchers/nofluffjobs'),
    require('./fetchers/pracujpl'),
    require('./fetchers/rocketjobs'),
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

  // 3. AI classification
  const classifiedOffers = await Promise.all(
    normalizedOffers.map((offer) => ai(offer)),
  );
  console.log(`Classified ${classifiedOffers.length} job offers.`);

  // 4. Deterministic filters
  const filteredOffers = classifiedOffers.filter((offer) =>
    filters(offer, config),
  );
  console.log(`Filtered down to ${filteredOffers.length} job offers.`);

  // 5. Deduplication (by title/location/salary)
  const seenOffers = await storage.load();
  const dedupedOffers = filteredOffers.filter((offer) => {
    return !seenOffers.some(
      (seen) =>
        seen.title === offer.title &&
        seen.location === offer.location &&
        seen.salary === offer.salary,
    );
  });
  console.log(`Deduplicated to ${dedupedOffers.length} new job offers.`);

  // Save new offers for future deduplication
  await storage.save(seenOffers.concat(dedupedOffers));

  // 6. Daily summary output
  if (dedupedOffers.length > 0) {
    const summary = dedupedOffers
      .map(
        (offer, i) =>
          `${i + 1}. ${offer.title} – ${offer.location} – ${offer.salary}`,
      )
      .join('\n');
    await notifier(summary, config);
    console.log('Summary sent.');
  } else {
    console.log('No new offers to notify.');
  }
}

run();
