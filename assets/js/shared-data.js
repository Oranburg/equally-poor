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

// S&P 500 Index — Year-end close
// Source: S&P Dow Jones Indices; Yale/Shiller CAPE dataset for pre-1957 data
const sp500Data = [
  {year:1957,value:39.99},{year:1958,value:55.21},{year:1959,value:59.89},
  {year:1960,value:58.11},{year:1961,value:71.55},{year:1962,value:63.10},
  {year:1963,value:75.02},{year:1964,value:84.75},{year:1965,value:92.43},
  {year:1966,value:80.33},{year:1967,value:96.47},{year:1968,value:103.86},
  {year:1969,value:92.06},{year:1970,value:92.15},{year:1971,value:102.09},
  {year:1972,value:118.05},{year:1973,value:97.55},{year:1974,value:68.56},
  {year:1975,value:90.19},{year:1976,value:107.46},{year:1977,value:95.10},
  {year:1978,value:96.11},{year:1979,value:107.94},{year:1980,value:135.76},
  {year:1981,value:122.55},{year:1982,value:140.64},{year:1983,value:164.93},
  {year:1984,value:167.24},{year:1985,value:211.28},{year:1986,value:242.17},
  {year:1987,value:247.08},{year:1988,value:277.72},{year:1989,value:353.40},
  {year:1990,value:330.22},{year:1991,value:417.09},{year:1992,value:435.71},
  {year:1993,value:466.45},{year:1994,value:459.27},{year:1995,value:615.93},
  {year:1996,value:740.74},{year:1997,value:970.43},{year:1998,value:1229.23},
  {year:1999,value:1469.25},{year:2000,value:1320.28},{year:2001,value:1148.08},
  {year:2002,value:879.82},{year:2003,value:1111.92},{year:2004,value:1211.92},
  {year:2005,value:1248.29},{year:2006,value:1418.30},{year:2007,value:1468.36},
  {year:2008,value:903.25},{year:2009,value:1115.10},{year:2010,value:1257.64},
  {year:2011,value:1257.60},{year:2012,value:1426.19},{year:2013,value:1848.36},
  {year:2014,value:2058.90},{year:2015,value:2043.94},{year:2016,value:2238.83},
  {year:2017,value:2673.61},{year:2018,value:2506.85},{year:2019,value:3230.78},
  {year:2020,value:3756.07},{year:2021,value:4766.18},{year:2022,value:3839.50},
  {year:2023,value:4769.83},{year:2024,value:5881.63}
];

// Dow Jones Industrial Average — Year-end close
// Source: S&P Dow Jones Indices; Macrotrends historical data
const djiaData = [
  {year:1920,value:71.95},{year:1921,value:78.59},{year:1922,value:98.73},{year:1923,value:95.52},
  {year:1924,value:120.51},{year:1925,value:156.66},{year:1926,value:157.44},
  {year:1927,value:200.70},{year:1928,value:300.01},{year:1929,value:248.48},
  {year:1930,value:164.58},{year:1931,value:77.90},{year:1932,value:59.93},
  {year:1933,value:99.90},{year:1934,value:104.04},{year:1935,value:144.13},
  {year:1936,value:183.26},{year:1937,value:120.85},{year:1938,value:154.36},
  {year:1939,value:150.24},{year:1940,value:131.13},{year:1941,value:110.96},
  {year:1942,value:119.71},{year:1943,value:135.89},{year:1944,value:152.32},
  {year:1945,value:192.91},{year:1946,value:177.20},{year:1947,value:181.16},
  {year:1948,value:177.30},{year:1949,value:200.13},{year:1950,value:235.42},
  {year:1951,value:269.23},{year:1952,value:292.00},{year:1953,value:280.90},
  {year:1954,value:404.39},{year:1955,value:488.40},{year:1956,value:499.47},
  {year:1957,value:435.69},{year:1958,value:583.65},{year:1959,value:679.36},
  {year:1960,value:615.89},{year:1961,value:731.14},{year:1962,value:646.79},
  {year:1963,value:762.95},{year:1964,value:874.13},{year:1965,value:969.26},
  {year:1966,value:785.69},{year:1967,value:905.11},{year:1968,value:943.75},
  {year:1969,value:800.36},{year:1970,value:838.92},{year:1971,value:890.20},
  {year:1972,value:1020.02},{year:1973,value:850.86},{year:1974,value:616.24},
  {year:1975,value:852.41},{year:1976,value:1004.65},{year:1977,value:831.17},
  {year:1978,value:805.01},{year:1979,value:838.74},{year:1980,value:963.99},
  {year:1981,value:875.00},{year:1982,value:1046.54},{year:1983,value:1258.64},
  {year:1984,value:1211.57},{year:1985,value:1546.67},{year:1986,value:1895.95},
  {year:1987,value:1938.83},{year:1988,value:2168.57},{year:1989,value:2753.20},
  {year:1990,value:2633.66},{year:1991,value:3168.83},{year:1992,value:3301.11},
  {year:1993,value:3754.09},{year:1994,value:3834.44},{year:1995,value:5117.12},
  {year:1996,value:6448.27},{year:1997,value:7908.25},{year:1998,value:9181.43},
  {year:1999,value:11497.12},{year:2000,value:10786.85},{year:2001,value:10021.57},
  {year:2002,value:8341.63},{year:2003,value:10453.92},{year:2004,value:10783.01},
  {year:2005,value:10717.50},{year:2006,value:12463.15},{year:2007,value:13264.82},
  {year:2008,value:8776.39},{year:2009,value:10428.05},{year:2010,value:11577.51},
  {year:2011,value:12217.56},{year:2012,value:13104.14},{year:2013,value:16576.66},
  {year:2014,value:17823.07},{year:2015,value:17425.03},{year:2016,value:19762.60},
  {year:2017,value:24719.22},{year:2018,value:23327.46},{year:2019,value:28538.44},
  {year:2020,value:30606.48},{year:2021,value:36338.30},{year:2022,value:33147.25},
  {year:2023,value:37689.54},{year:2024,value:42544.22}
];

// Wilshire 5000 Total Market Index — Year-end close
// Source: Wilshire Associates via FRED (WILL5000IND)
const wilshire5000Data = [
  {year:1974,value:406.60},{year:1975,value:525.30},{year:1976,value:612.30},
  {year:1977,value:533.10},{year:1978,value:536.60},{year:1979,value:603.50},
  {year:1980,value:761.00},{year:1981,value:690.60},{year:1982,value:813.40},
  {year:1983,value:987.80},{year:1984,value:993.60},{year:1985,value:1271.00},
  {year:1986,value:1441.70},{year:1987,value:1460.60},{year:1988,value:1629.30},
  {year:1989,value:2082.00},{year:1990,value:1879.50},{year:1991,value:2407.50},
  {year:1992,value:2557.40},{year:1993,value:2758.50},{year:1994,value:2664.40},
  {year:1995,value:3614.50},{year:1996,value:4336.20},{year:1997,value:5691.80},
  {year:1998,value:7148.60},{year:1999,value:8696.90},{year:2000,value:7661.20},
  {year:2001,value:6650.80},{year:2002,value:5117.70},{year:2003,value:6536.30},
  {year:2004,value:7178.10},{year:2005,value:7486.00},{year:2006,value:8581.80},
  {year:2007,value:8892.40},{year:2008,value:5323.50},{year:2009,value:6653.10},
  {year:2010,value:7597.40},{year:2011,value:7549.90},{year:2012,value:8603.20},
  {year:2013,value:11255.20},{year:2014,value:12655.40},{year:2015,value:12629.40},
  {year:2016,value:13979.00},{year:2017,value:16884.00},{year:2018,value:15575.10},
  {year:2019,value:20264.40},{year:2020,value:23818.40},{year:2021,value:30296.00},
  {year:2022,value:24250.80},{year:2023,value:30170.60},{year:2024,value:37020.50}
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
