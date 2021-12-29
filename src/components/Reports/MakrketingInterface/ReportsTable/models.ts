export interface ICalculatedMetricsBySources {
  source: string;
  conversions: number;
  cpi: number;
}

export interface IСalculatedMetricsTargetologsId {
  targetologId: string;
  targetologName: string;
  conversions: number;
  cpi: number;
}

export interface ICalculatedReportMetricsByKey {
  [key: string]: number;
}
