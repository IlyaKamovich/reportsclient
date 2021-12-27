export interface IMixedReportsResultByPediod {
  [key: string]: string | number; // There may be one of the keys here [source or targetologId with targetologName]
  conversions: number;
  cpi: number;
}

export interface ICalculatedReportMetricsByKey {
  [key: string]: number;
}
