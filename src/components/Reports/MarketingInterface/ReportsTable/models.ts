export interface IMetricsBySource {
  source: string;
  conversions: number;
  cpl: number;
}

export interface IMetricsByTargetolog {
  targetologId: string;
  targetologName: string;
  conversions: number;
  cpl: number;
}

export interface ICalculatedReportMetricsByKey {
  [key: string]: number;
}
