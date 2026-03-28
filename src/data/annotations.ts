import { Annotation } from "./types";

export const annotations: Annotation[] = [
  {year:1929, label:"Great Depression", type:"band", end:1933, color:"#E96955"},
  {year:1941, label:"WWII",             type:"band", end:1945, color:"#6DACDE"},
  {year:1964, label:"War on Poverty",   type:"line", color:"#2459A9"},
  {year:1981, label:"ERTA",             type:"line", color:"#B21F2C"},
  {year:1986, label:"TRA",              type:"line", color:"#B21F2C"},
  {year:1996, label:"Welfare Reform",   type:"line", color:"#0A3255"},
  {year:2007, label:"Great Recession",  type:"band", end:2009, color:"#E96955"},
  {year:2020, label:"COVID-19",         type:"line", color:"#B21F2C"},
];
