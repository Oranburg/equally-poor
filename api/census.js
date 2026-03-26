// api/census.js
// Backend utility for fetching data from the US Census API

require('dotenv').config();
const axios = require('axios');

const CENSUS_API_KEY = process.env.CENSUS_API_KEY;
const BASE_URL = 'https://api.census.gov/data';

/**
 * Fetch data from the US Census API
 * @param {string} year - The year of the dataset (e.g., '2020')
 * @param {string} dataset - The dataset name (e.g., 'acs/acs5')
 * @param {object} params - Additional query parameters
 * @returns {Promise<object>} - The API response data
 */
async function fetchCensusData(year, dataset, params = {}) {
  if (!CENSUS_API_KEY) throw new Error('Census API key not set');
  const url = `${BASE_URL}/${year}/${dataset}`;
  const query = new URLSearchParams({ ...params, key: CENSUS_API_KEY }).toString();
  const fullUrl = `${url}?${query}`;
  const response = await axios.get(fullUrl);
  return response.data;
}

module.exports = { fetchCensusData };