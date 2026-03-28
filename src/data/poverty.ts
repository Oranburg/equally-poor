import type { DataPoint } from "./types";

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

// Child Poverty Rate (Under 18) — 1959-2024
// Source: Census CPS ASEC; FRED Series HSTPOVARU18YAPU18YBPPP
export const childPovertyData: DataPoint[] = [
  {year:1959,value:0.272},{year:1960,value:0.266},{year:1961,value:0.258},
  {year:1962,value:0.250},{year:1963,value:0.234},{year:1964,value:0.230},
  {year:1965,value:0.210},{year:1966,value:0.178},{year:1967,value:0.163},
  {year:1968,value:0.154},{year:1969,value:0.140},{year:1970,value:0.150},
  {year:1971,value:0.153},{year:1972,value:0.148},{year:1973,value:0.142},
  {year:1974,value:0.153},{year:1975,value:0.168},{year:1976,value:0.159},
  {year:1977,value:0.161},{year:1978,value:0.155},{year:1979,value:0.162},
  {year:1980,value:0.179},{year:1981,value:0.198},{year:1982,value:0.213},
  {year:1983,value:0.220},{year:1984,value:0.212},{year:1985,value:0.204},
  {year:1986,value:0.197},{year:1987,value:0.200},{year:1988,value:0.195},
  {year:1989,value:0.195},{year:1990,value:0.201},{year:1991,value:0.214},
  {year:1992,value:0.221},{year:1993,value:0.226},{year:1994,value:0.215},
  {year:1995,value:0.207},{year:1996,value:0.201},{year:1997,value:0.196},
  {year:1998,value:0.184},{year:1999,value:0.168},{year:2000,value:0.161},
  {year:2001,value:0.160},{year:2002,value:0.167},{year:2003,value:0.176},
  {year:2004,value:0.176},{year:2005,value:0.175},{year:2006,value:0.172},
  {year:2007,value:0.181},{year:2008,value:0.190},{year:2009,value:0.208},
  {year:2010,value:0.221},{year:2011,value:0.218},{year:2012,value:0.218},
  {year:2013,value:0.198},{year:2014,value:0.213},{year:2015,value:0.196},
  {year:2016,value:0.181},{year:2017,value:0.175},{year:2018,value:0.163},
  {year:2019,value:0.145},{year:2020,value:0.162},{year:2021,value:0.154},
  {year:2022,value:0.168},{year:2023,value:0.157},{year:2024,value:0.160},
];

// Elderly Poverty Rate (65+) — 1959-2024
// Source: Census CPS ASEC; FRED Series HSTPOVAR65YOBPPP
export const elderlyPovertyData: DataPoint[] = [
  {year:1959,value:0.352},{year:1960,value:0.351},{year:1961,value:0.337},
  {year:1962,value:0.326},{year:1963,value:0.314},{year:1964,value:0.298},
  {year:1965,value:0.286},{year:1966,value:0.286},{year:1967,value:0.298},
  {year:1968,value:0.252},{year:1969,value:0.252},{year:1970,value:0.246},
  {year:1971,value:0.219},{year:1972,value:0.186},{year:1973,value:0.163},
  {year:1974,value:0.148},{year:1975,value:0.152},{year:1976,value:0.150},
  {year:1977,value:0.142},{year:1978,value:0.140},{year:1979,value:0.152},
  {year:1980,value:0.156},{year:1981,value:0.153},{year:1982,value:0.147},
  {year:1983,value:0.138},{year:1984,value:0.124},{year:1985,value:0.126},
  {year:1986,value:0.124},{year:1987,value:0.123},{year:1988,value:0.120},
  {year:1989,value:0.115},{year:1990,value:0.122},{year:1991,value:0.123},
  {year:1992,value:0.127},{year:1993,value:0.122},{year:1994,value:0.117},
  {year:1995,value:0.105},{year:1996,value:0.109},{year:1997,value:0.106},
  {year:1998,value:0.105},{year:1999,value:0.097},{year:2000,value:0.100},
  {year:2001,value:0.102},{year:2002,value:0.102},{year:2003,value:0.103},
  {year:2004,value:0.098},{year:2005,value:0.101},{year:2006,value:0.093},
  {year:2007,value:0.098},{year:2008,value:0.098},{year:2009,value:0.088},
  {year:2010,value:0.090},{year:2011,value:0.087},{year:2012,value:0.091},
  {year:2013,value:0.100},{year:2014,value:0.100},{year:2015,value:0.087},
  {year:2016,value:0.094},{year:2017,value:0.092},{year:2018,value:0.098},
  {year:2019,value:0.088},{year:2020,value:0.090},{year:2021,value:0.101},
  {year:2022,value:0.107},{year:2023,value:0.102},{year:2024,value:0.103},
];

// Female-Headed Household Poverty Rate — 1959-2024
// Source: Census CPS ASEC; FRED Series HSTPOVARPFFWFHNSPBPP
export const femaleHeadedPovertyData: DataPoint[] = [
  {year:1959,value:0.429},{year:1960,value:0.424},{year:1961,value:0.420},
  {year:1962,value:0.418},{year:1963,value:0.401},{year:1964,value:0.385},
  {year:1965,value:0.382},{year:1966,value:0.353},{year:1967,value:0.333},
  {year:1968,value:0.322},{year:1969,value:0.321},{year:1970,value:0.325},
  {year:1971,value:0.329},{year:1972,value:0.327},{year:1973,value:0.321},
  {year:1974,value:0.322},{year:1975,value:0.327},{year:1976,value:0.330},
  {year:1977,value:0.316},{year:1978,value:0.316},{year:1979,value:0.302},
  {year:1980,value:0.327},{year:1981,value:0.345},{year:1982,value:0.362},
  {year:1983,value:0.361},{year:1984,value:0.340},{year:1985,value:0.340},
  {year:1986,value:0.340},{year:1987,value:0.340},{year:1988,value:0.334},
  {year:1989,value:0.326},{year:1990,value:0.337},{year:1991,value:0.355},
  {year:1992,value:0.353},{year:1993,value:0.358},{year:1994,value:0.345},
  {year:1995,value:0.321},{year:1996,value:0.322},{year:1997,value:0.314},
  {year:1998,value:0.294},{year:1999,value:0.276},{year:2000,value:0.251},
  {year:2001,value:0.262},{year:2002,value:0.268},{year:2003,value:0.280},
  {year:2004,value:0.283},{year:2005,value:0.287},{year:2006,value:0.283},
  {year:2007,value:0.281},{year:2008,value:0.289},{year:2009,value:0.299},
  {year:2010,value:0.314},{year:2011,value:0.316},{year:2012,value:0.308},
  {year:2013,value:0.307},{year:2014,value:0.305},{year:2015,value:0.285},
  {year:2016,value:0.268},{year:2017,value:0.258},{year:2018,value:0.244},
  {year:2019,value:0.224},{year:2020,value:0.234},{year:2021,value:0.234},
  {year:2022,value:0.241},{year:2023,value:0.232},{year:2024,value:0.235},
];
