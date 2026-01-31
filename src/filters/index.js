// Deterministic filtering rules
module.exports = function filter(offer, config) {
  // Filter out non-frontend or spam
  if (offer.frontend === false || offer.spam === true) return false;

  // Location filter
  if (
    config.preferredLocations &&
    !config.preferredLocations.some(loc =>
      offer.location && offer.location.toLowerCase().includes(loc.toLowerCase())
    )
  ) {
    return false;
  }

  // Salary filter (extract min salary from string)
  if (config.minSalary) {
    const match = String(offer.salary).replace(/\s/g, '').match(/(\d{2,5})/);
    if (match && parseInt(match[1], 10) < config.minSalary) return false;
  }

  // Tech stack filter
  if (
    config.allowedTech &&
    config.allowedTech.length > 0 &&
    offer.tech && Array.isArray(offer.tech)
  ) {
    const hasTech = offer.tech.some(tech =>
      config.allowedTech.some(allowed =>
        tech && tech.toLowerCase().includes(allowed.toLowerCase())
      )
    );
    if (!hasTech) return false;
  }

  // Seniority filter (optional, e.g. skip 'junior')
  if (offer.seniority && offer.seniority.toLowerCase() === 'junior') return false;

  return true;
};
