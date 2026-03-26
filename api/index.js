// api/index.js
// Express server for API endpoints

require('dotenv').config();
const express = require('express');
const cors = require('cors');


const { fetchCensusData } = require('./census');
const { fetchFredData } = require('./fred');
const { listDatasets } = require('./datasets');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to list all available static datasets
app.get('/api/datasets', (req, res) => {
  try {
    const datasets = listDatasets();
    res.json(datasets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example endpoint: /api/fred?endpoint=series/observations&series_id=UNRATE
app.get('/api/fred', async (req, res) => {
  try {
    const { endpoint, ...params } = req.query;
    if (!endpoint) {
      return res.status(400).json({ error: 'Missing endpoint parameter' });
    }
    const data = await fetchFredData(endpoint, params);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example endpoint: /api/census?year=2020&dataset=acs/acs5&get=NAME,B01001_001E&for=state:*
app.get('/api/census', async (req, res) => {
  try {
    const { year, dataset, ...params } = req.query;
    if (!year || !dataset) {
      return res.status(400).json({ error: 'Missing year or dataset parameter' });
    }
    const data = await fetchCensusData(year, dataset, params);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
