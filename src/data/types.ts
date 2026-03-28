export interface DataPoint {
  year: number;
  value: number;
}

export interface Annotation {
  year: number;
  label: string;
  type: "band" | "line";
  end?: number;
  color: string;
}

export interface Legislation {
  year: number;
  title: string;
  type: "tax" | "welfare" | "labor";
  effect: "increase" | "decrease";
  description: string;
}

export interface ScotusCase {
  name: string;
  year: number;
  issue: string;
  holding: string;
}

export type SeriesKey = "top10" | "top1" | "gini" | "poverty" | "povertyPre";
