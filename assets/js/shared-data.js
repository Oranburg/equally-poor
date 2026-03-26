// ============================================================
// EQUALLY POOR — Shared Data
// All economic inequality datasets used across the platform.
// ============================================================

// Piketty-Saez Top 10% Income Share (excl. cap gains), 1917-2022
// Source: Piketty & Saez, QJE 2003; updated March 2024
const top10Data = [
  {year:1917,value:0.404},{year:1918,value:0.375},{year:1919,value:0.380},
  {year:1920,value:0.384},{year:1921,value:0.377},{year:1922,value:0.390},
  {year:1923,value:0.362},{year:1924,value:0.373},{year:1925,value:0.399},
  {year:1926,value:0.399},{year:1927,value:0.403},{year:1928,value:0.432},
  {year:1929,value:0.439},{year:1930,value:0.412},{year:1931,value:0.397},
  {year:1932,value:0.380},{year:1933,value:0.376},{year:1934,value:0.375},
  {year:1935,value:0.385},{year:1936,value:0.415},{year:1937,value:0.400},
  {year:1938,value:0.385},{year:1939,value:0.393},{year:1940,value:0.399},
  {year:1941,value:0.376},{year:1942,value:0.344},{year:1943,value:0.328},
  {year:1944,value:0.321},{year:1945,value:0.327},{year:1946,value:0.346},
  {year:1947,value:0.339},{year:1948,value:0.333},{year:1949,value:0.332},
  {year:1950,value:0.339},{year:1951,value:0.328},{year:1952,value:0.320},
  {year:1953,value:0.317},{year:1954,value:0.319},{year:1955,value:0.326},
  {year:1956,value:0.323},{year:1957,value:0.319},{year:1958,value:0.316},
  {year:1959,value:0.325},{year:1960,value:0.319},{year:1961,value:0.320},
  {year:1962,value:0.325},{year:1963,value:0.325},{year:1964,value:0.329},
  {year:1965,value:0.334},{year:1966,value:0.336},{year:1967,value:0.333},
  {year:1968,value:0.335},{year:1969,value:0.334},{year:1970,value:0.323},
  {year:1971,value:0.321},{year:1972,value:0.325},{year:1973,value:0.322},
  {year:1974,value:0.315},{year:1975,value:0.316},{year:1976,value:0.321},
  {year:1977,value:0.323},{year:1978,value:0.327},{year:1979,value:0.329},
  {year:1980,value:0.329},{year:1981,value:0.328},{year:1982,value:0.338},
  {year:1983,value:0.343},{year:1984,value:0.353},{year:1985,value:0.361},
  {year:1986,value:0.385},{year:1987,value:0.374},{year:1988,value:0.403},
  {year:1989,value:0.396},{year:1990,value:0.397},{year:1991,value:0.389},
  {year:1992,value:0.399},{year:1993,value:0.399},{year:1994,value:0.397},
  {year:1995,value:0.411},{year:1996,value:0.424},{year:1997,value:0.436},
  {year:1998,value:0.449},{year:1999,value:0.458},{year:2000,value:0.474},
  {year:2001,value:0.450},{year:2002,value:0.440},{year:2003,value:0.443},
  {year:2004,value:0.454},{year:2005,value:0.469},{year:2006,value:0.479},
  {year:2007,value:0.491},{year:2008,value:0.475},{year:2009,value:0.464},
  {year:2010,value:0.477},{year:2011,value:0.481},{year:2012,value:0.506},
  {year:2013,value:0.471},{year:2014,value:0.474},{year:2015,value:0.474},
  {year:2016,value:0.470},{year:2017,value:0.474},{year:2018,value:0.471},
  {year:2019,value:0.474},{year:2020,value:0.467},{year:2021,value:0.500},
  {year:2022,value:0.461}
];

// Piketty-Saez Top 1% Income Share (incl. cap gains), 1917-2022
// Source: Piketty & Saez, QJE 2003; updated March 2024
const top1Data = [
  {year:1917,value:0.180},{year:1918,value:0.159},{year:1919,value:0.165},
  {year:1920,value:0.154},{year:1921,value:0.151},{year:1922,value:0.157},
  {year:1923,value:0.141},{year:1924,value:0.155},{year:1925,value:0.175},
  {year:1926,value:0.178},{year:1927,value:0.181},{year:1928,value:0.208},
  {year:1929,value:0.238},{year:1930,value:0.174},{year:1931,value:0.166},
  {year:1932,value:0.143},{year:1933,value:0.141},{year:1934,value:0.135},
  {year:1935,value:0.138},{year:1936,value:0.163},{year:1937,value:0.151},
  {year:1938,value:0.138},{year:1939,value:0.144},{year:1940,value:0.147},
  {year:1941,value:0.130},{year:1942,value:0.107},{year:1943,value:0.098},
  {year:1944,value:0.093},{year:1945,value:0.096},{year:1946,value:0.112},
  {year:1947,value:0.107},{year:1948,value:0.101},{year:1949,value:0.100},
  {year:1950,value:0.109},{year:1951,value:0.100},{year:1952,value:0.095},
  {year:1953,value:0.093},{year:1954,value:0.098},{year:1955,value:0.103},
  {year:1956,value:0.101},{year:1957,value:0.098},{year:1958,value:0.100},
  {year:1959,value:0.106},{year:1960,value:0.100},{year:1961,value:0.102},
  {year:1962,value:0.104},{year:1963,value:0.105},{year:1964,value:0.107},
  {year:1965,value:0.110},{year:1966,value:0.112},{year:1967,value:0.107},
  {year:1968,value:0.112},{year:1969,value:0.108},{year:1970,value:0.098},
  {year:1971,value:0.095},{year:1972,value:0.099},{year:1973,value:0.093},
  {year:1974,value:0.083},{year:1975,value:0.082},{year:1976,value:0.083},
  {year:1977,value:0.085},{year:1978,value:0.086},{year:1979,value:0.087},
  {year:1980,value:0.085},{year:1981,value:0.083},{year:1982,value:0.088},
  {year:1983,value:0.091},{year:1984,value:0.097},{year:1985,value:0.101},
  {year:1986,value:0.121},{year:1987,value:0.107},{year:1988,value:0.131},
  {year:1989,value:0.124},{year:1990,value:0.121},{year:1991,value:0.115},
  {year:1992,value:0.133},{year:1993,value:0.125},{year:1994,value:0.126},
  {year:1995,value:0.138},{year:1996,value:0.154},{year:1997,value:0.172},
  {year:1998,value:0.183},{year:1999,value:0.194},{year:2000,value:0.213},
  {year:2001,value:0.175},{year:2002,value:0.157},{year:2003,value:0.162},
  {year:2004,value:0.176},{year:2005,value:0.195},{year:2006,value:0.203},
  {year:2007,value:0.225},{year:2008,value:0.200},{year:2009,value:0.179},
  {year:2010,value:0.200},{year:2011,value:0.196},{year:2012,value:0.237},
  {year:2013,value:0.188},{year:2014,value:0.193},{year:2015,value:0.193},
  {year:2016,value:0.188},{year:2017,value:0.193},{year:2018,value:0.194},
  {year:2019,value:0.197},{year:2020,value:0.189},{year:2021,value:0.229},
  {year:2022,value:0.190}
];

// Census Gini Coefficient (1967-2024)
// Source: U.S. Census Bureau, CPS ASEC; FRED Series GINIALLRH
const giniData = [
  {year:1967,value:0.397},{year:1968,value:0.386},{year:1969,value:0.391},
  {year:1970,value:0.394},{year:1971,value:0.396},{year:1972,value:0.401},
  {year:1973,value:0.397},{year:1974,value:0.395},{year:1975,value:0.397},
  {year:1976,value:0.398},{year:1977,value:0.402},{year:1978,value:0.402},
  {year:1979,value:0.404},{year:1980,value:0.403},{year:1981,value:0.406},
  {year:1982,value:0.412},{year:1983,value:0.414},{year:1984,value:0.415},
  {year:1985,value:0.419},{year:1986,value:0.425},{year:1987,value:0.426},
  {year:1988,value:0.427},{year:1989,value:0.431},{year:1990,value:0.428},
  {year:1991,value:0.428},{year:1992,value:0.434},{year:1993,value:0.454},
  {year:1994,value:0.456},{year:1995,value:0.450},{year:1996,value:0.455},
  {year:1997,value:0.459},{year:1998,value:0.456},{year:1999,value:0.457},
  {year:2000,value:0.462},{year:2001,value:0.466},{year:2002,value:0.462},
  {year:2003,value:0.464},{year:2004,value:0.466},{year:2005,value:0.469},
  {year:2006,value:0.470},{year:2007,value:0.470},{year:2008,value:0.466},
  {year:2009,value:0.468},{year:2010,value:0.470},{year:2011,value:0.477},
  {year:2012,value:0.477},{year:2013,value:0.476},{year:2014,value:0.480},
  {year:2015,value:0.479},{year:2016,value:0.481},{year:2017,value:0.489},
  {year:2018,value:0.486},{year:2019,value:0.484},{year:2020,value:0.489},
  {year:2021,value:0.494},{year:2022,value:0.494},{year:2023,value:0.490},
  {year:2024,value:0.485}
];

// Official Poverty Rate (1959-2024)
// Source: Shrider, "Poverty in the United States: 2024," P60-287 (Sept. 2025)
const povertyData = [
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
  {year:2022,value:0.119},{year:2023,value:0.114},{year:2024,value:0.115}
];

// Pre-1959 Poverty Estimates — UNOFFICIAL
// Sources: Plotnick et al. (2000); Fisher (1986, withdrawn 1999)
// WARNING: No household survey existed before 1947. These are econometric backcasts.
const povertyPre = [
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
  {year:1958,value:0.25},{year:1959,value:0.224}
];

// Key historical annotations
const annotations = [
  {year:1929, label:"Great Depression", type:"band", end:1933, color:"#E96955"},
  {year:1941, label:"WWII",             type:"band", end:1945, color:"#6DACDE"},
  {year:1964, label:"War on Poverty",   type:"line", color:"#2459A9"},
  {year:1981, label:"ERTA",             type:"line", color:"#B21F2C"},
  {year:1986, label:"TRA",              type:"line", color:"#B21F2C"},
  {year:1996, label:"Welfare Reform",   type:"line", color:"#0A3255"},
  {year:2007, label:"Great Recession",  type:"band", end:2009, color:"#E96955"},
  {year:2020, label:"COVID-19",         type:"line", color:"#B21F2C"}
];

// Key legislation for legal page
const keyLegislation = [
  {year:1913, title:"16th Amendment",                        type:"tax",    effect:"decrease",
   description:"Authorized federal income tax; enabled progressive taxation as primary inequality-reduction tool."},
  {year:1935, title:"Social Security Act",                   type:"welfare",effect:"decrease",
   description:"Created federal old-age insurance; first major federal income support program targeting the elderly poor."},
  {year:1938, title:"Fair Labor Standards Act",              type:"labor",  effect:"decrease",
   description:"Established federal minimum wage ($0.25/hr), overtime pay, and child labor restrictions."},
  {year:1944, title:"Servicemen's Readjustment Act (GI Bill)",type:"welfare",effect:"decrease",
   description:"Enabled broad middle-class access to homeownership and higher education for returning veterans."},
  {year:1964, title:"Economic Opportunity Act",              type:"welfare",effect:"decrease",
   description:"'War on Poverty' legislation; created Head Start, Job Corps, and VISTA; poverty fell sharply 1964–1969."},
  {year:1965, title:"Medicare & Medicaid",                   type:"welfare",effect:"decrease",
   description:"Social Security Amendments creating federal healthcare for elderly and low-income Americans."},
  {year:1981, title:"Economic Recovery Tax Act (ERTA)",      type:"tax",    effect:"increase",
   description:"Reagan tax cuts reduced the top marginal rate from 70% to 50%; widely cited as a turning point in inequality."},
  {year:1986, title:"Tax Reform Act",                        type:"tax",    effect:"increase",
   description:"Reduced top marginal rate to 28%; eliminated many deductions; produced income-timing effects (1988 spike)."},
  {year:1993, title:"Omnibus Budget Reconciliation Act",     type:"tax",    effect:"decrease",
   description:"Clinton raised top marginal rate to 39.6% and significantly expanded the Earned Income Tax Credit."},
  {year:1996, title:"Personal Responsibility and Work Opportunity Act", type:"welfare", effect:"increase",
   description:"'Welfare reform': replaced AFDC with TANF; imposed time limits and work requirements; deep poverty rose."},
  {year:2001, title:"EGTRRA",                                type:"tax",    effect:"increase",
   description:"Bush tax cuts reduced all income tax rates and phased out the estate tax; extended through 2010."},
  {year:2010, title:"Affordable Care Act",                   type:"welfare",effect:"decrease",
   description:"Expanded Medicaid to low-income adults; subsidized insurance marketplace; uninsured rate fell by half."},
  {year:2017, title:"Tax Cuts and Jobs Act",                 type:"tax",    effect:"increase",
   description:"Reduced corporate rate 35%→21%; cut individual rates; doubled standard deduction; regressive net effect."},
  {year:2021, title:"American Rescue Plan Act",              type:"welfare",effect:"decrease",
   description:"Expanded Child Tax Credit to near-universal; reduced child poverty by ~30% in 2021 (reversed in 2022)."}
];
