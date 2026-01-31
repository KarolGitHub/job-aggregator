// Data normalization logic
module.exports = function normalize(offer) {
  // Normalize title (trim, capitalize first letter)
  let title = offer.title ? offer.title.trim() : '';
  if (title) title = title.charAt(0).toUpperCase() + title.slice(1);

  // Normalize salary (extract numbers, unify format)
  let salary = offer.salary || 'N/A';
  if (typeof salary === 'string') {
    salary = salary.replace(/\s/g, '');
    // Try to extract range like 15-20k or 15000-20000
    const match = salary.match(/(\d{2,5})[–-](\d{2,5})/);
    if (match) {
      salary = `${match[1]}–${match[2]}`;
    }
  }

  // Normalize location (capitalize, fallback to 'Remote')
  let location = offer.location ? offer.location.trim() : 'Remote';
  if (location) location = location.charAt(0).toUpperCase() + location.slice(1);

  // Normalize description (strip HTML, trim)
  let description = offer.description || '';
  description = description.replace(/<[^>]+>/g, '').trim();

  return {
    ...offer,
    title,
    salary,
    location,
    description,
  };
};
