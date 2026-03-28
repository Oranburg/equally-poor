import { DataPoint } from "./types";

// Official Poverty Rate (1959-2024)
// Source: Shrider, "Poverty in the United States: 2024," P60-287 (Sept. 2025)
export const povertyData: DataPoint[] = [
  {year:1959,value:0.224},{year:1960,value:0.220},{year:1961,value:0.219},
  {year:1962,value:0.210},{year:1963,value:0.197},{year:1964,value:0.190},
  {year:1965,value:0.172},{year:1966,value:0.147},{year:1967,value:0.142},
  {year:1968,value:0.127},{year:1969,value:0.122},{year:1970,value:0.126},
  {year:1971,value:0.121},{year:1972,value:0.119},{year:1973,value:0.111},
  {year:1974,value:0.116},{year:1975,value:0.122},{year:1976,value:0.117},
  {year:1977,value:0.116},{year:1978,value:0.113},{year:1979,value:0.117},
  {year:1980,value:0.130},{year:1981,value:0.140},{year:1982,value:0.150},
  {year:1983,value:0.152},{year:1984,value:0.144},{year:1985,value:0.140},
  {year:1986,value:0.136},{year:1987,value:0.133},{year:1988,value:0.131},
  {year:1989,value:0.126},{year:1990,value:0.135},{year:1991,value:0.143},
  {year:1992,value:0.148},{year:1993,value:0.151},{year:1994,value:0.145},
  {year:1995,value:0.137},{year:1996,value:0.136},{year:1997,value:0.134},
  {year:1998,value:0.126},{year:1999,value:0.117},{year:2000,value:0.113},
  {year:2001,value:0.116},{year:2002,value:0.120},{year:2003,value:0.125},
  {year:2004,value:0.127},{year:2005,value:0.128},{year:2006,value:0.126},
  {year:2007,value:0.125},{year:2008,value:0.132},{year:2009,value:0.143},
  {year:2010,value:0.153},{year:2011,value:0.150},{year:2012,value:0.150},
  {year:2013,value:0.147},{year:2014,value:0.148},{year:2015,value:0.135},
  {year:2016,value:0.126},{year:2017,value:0.127},{year:2018,value:0.114},
  {year:2019,value:0.105},{year:2020,value:0.115},{year:2021,value:0.115},
  {year:2022,value:0.119},{year:2023,value:0.114},{year:2024,value:0.115},
];

// Pre-1959 Poverty Estimates — UNOFFICIAL
// Sources: Plotnick et al. (2000); Fisher (1986, withdrawn 1999)
// WARNING: No household survey existed before 1947. These are econometric backcasts.
export const povertyPre: DataPoint[] = [
  {year:1914,value:0.66},{year:1917,value:0.63},{year:1919,value:0.58},
  {year:1920,value:0.57},{year:1922,value:0.57},{year:1923,value:0.52},
  {year:1924,value:0.53},{year:1926,value:0.49},{year:1927,value:0.48},
  {year:1928,value:0.46},{year:1929,value:0.44},{year:1930,value:0.50},
  {year:1931,value:0.60},{year:1932,value:0.68},{year:1933,value:0.67},
  {year:1934,value:0.62},{year:1935,value:0.59},{year:1936,value:0.53},
  {year:1937,value:0.50},{year:1938,value:0.53},{year:1939,value:0.50},
  {year:1940,value:0.48},{year:1941,value:0.44},{year:1942,value:0.37},
  {year:1943,value:0.32},{year:1944,value:0.28},{year:1945,value:0.29},
  {year:1946,value:0.31},{year:1947,value:0.30},{year:1948,value:0.30},
  {year:1949,value:0.31},{year:1950,value:0.29},{year:1951,value:0.27},
  {year:1952,value:0.26},{year:1953,value:0.25},{year:1954,value:0.26},
  {year:1955,value:0.25},{year:1956,value:0.23},{year:1957,value:0.24},
  {year:1958,value:0.25},{year:1959,value:0.224},
];
