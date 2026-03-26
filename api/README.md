
# US Census & St. Louis Fed FRED API Integration

This backend service provides endpoints to fetch data from the US Census API and the St. Louis Fed FRED API using your API keys.

## Setup

1. Add your API keys to the `.env` file:
   
   CENSUS_API_KEY=your_census_api_key_here
   FRED_API_KEY=your_fred_api_key_here

2. Install dependencies:
   
   cd api
   npm install express axios dotenv cors

3. Start the server:
   
   node index.js


## Usage

### US Census API

Example request:

GET http://localhost:4000/api/census?year=2020&dataset=acs/acs5&get=NAME,B01001_001E&for=state:*

This will return population data for all states from the 2020 ACS 5-year estimates.

You can adjust the `year`, `dataset`, and query parameters as needed. See the [US Census API documentation](https://www.census.gov/data/developers/data-sets.html) for details.

### St. Louis Fed FRED API

Example request:

GET http://localhost:4000/api/fred?endpoint=series/observations&series_id=UNRATE

This will return unemployment rate observations from the FRED API.

You can adjust the `endpoint` and query parameters as needed. See the [FRED API documentation](https://fred.stlouisfed.org/docs/api/fred/) for details.
