export interface IMetricsBySource {
  source: string;
  conversions: number;
  cpi: number;
}

export interface IMetricsByTargetolog {
  targetologId: string;
  targetologName: string;
  conversions: number;
  cpi: number;
}

export interface ICalculatedReportMetricsByKey {
  [key: string]: number;
}
