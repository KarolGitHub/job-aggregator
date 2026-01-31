// SQLite / JSON persistence
const fs = require('fs').promises;
const path = require('path');
const DATA_FILE = path.join(__dirname, '../../data/offers.json');

module.exports = {
  save: async function (offers) {
    try {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(offers, null, 2), 'utf-8');
    } catch (err) {
      console.error('Storage save error:', err);
    }
  },
  load: async function () {
    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      // If file doesn't exist, return empty array
      return [];
    }
  },
};
