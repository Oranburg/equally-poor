// api/datasets/index.js
// Utility to list available static datasets for toggling in the frontend

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');

function listDatasets() {
  const entries = fs.readdirSync(DATA_DIR, { withFileTypes: true });
  return entries.map(entry => ({
    name: entry.name,
    type: entry.isDirectory() ? 'folder' : 'file',
  }));
}

module.exports = { listDatasets };
