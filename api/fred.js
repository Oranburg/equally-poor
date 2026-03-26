// api/fred.js
// Backend utility for fetching data from the St. Louis Fed FRED API

require('dotenv').config();
const axios = require('axios');

const FRED_API_KEY = process.env.FRED_API_KEY;
const BASE_URL = 'https://api.stlouisfed.org/fred';

/**
 * Fetch data from the FRED API
 * @param {string} endpoint - The FRED API endpoint (e.g., 'series/observations')
 * @param {object} params - Additional query parameters
 * @returns {Promise<object>} - The API response data
 */
async function fetchFredData(endpoint, params = {}) {
  if (!FRED_API_KEY) throw new Error('FRED API key not set');
  const url = `${BASE_URL}/${endpoint}`;
  const query = new URLSearchParams({ ...params, api_key: FRED_API_KEY, file_type: 'json' }).toString();
  const fullUrl = `${url}?${query}`;
  const response = await axios.get(fullUrl);
  return response.data;
}

module.exports = { fetchFredData };