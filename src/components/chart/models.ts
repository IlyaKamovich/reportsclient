export interface IReports {
  reports: Array<IReport>;
}

export interface IReport {
  _id: string;
  date: Date;
  targetologId: string;
  targetologName: string;
  formattedDate: Date;
  metrics: {
    conversions: number;
    cpi: number;
  };
}

export interface ILegendData {
  value: any;
  id: MetricsKeys | 'trendline';
  type: LegendType;
  color: string;
}

//legend vertical alignment type
export type VerticalAlignmentType = 'top' | 'bottom' | 'middle';

//legend horizontal alignment type
export type HorizontalAlignmentType = 'center' | 'left' | 'right';

export interface IChartSessings {
  responsiveContainer: {
    width: string;
    aspect: number;
  };
  chartMargin: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  line: {
    strokeWidth: number;
  };
  xAxisPadding: {
    left: number;
    right: number;
  };
  yAxisLabel: {
    angle: number;
    position: string;
    textAnchor: string;
  };
  yAxisPadding: {
    top: number;
    bottom: number;
  };
  dotSettings: {
    strokeWidth: number;
  };
  label: {
    fontSize: number;
    fontWeight: number;
    dy: number;
    textAnchor: string;
  };
  trendlineDot: {
    item: boolean;
  };
  legend: {
    height: number;
    verticalAlign: VerticalAlignmentType;
    align: HorizontalAlignmentType;
    iconType: string;
  };
}

export declare type LegendType =
  | 'plainline'
  | 'line'
  | 'square'
  | 'rect'
  | 'circle'
  | 'cross'
  | 'diamond'
  | 'star'
  | 'triangle'
  | 'wye'
  | 'none';

export interface IReportsByKey {
  [x: string]: string | number;
  targetolog: string;
}

export interface IReportsWithTrendline extends IReportsByKey {
  trendline: number;
}

export enum SourceKeys {
  FB = 'FB',
  TT = 'TT',
}

export interface ITargetologs {
  targetologs: Array<ITargetolog>;
}

export interface ITargetolog {
  _id: string;
  name: string;
  source: string;
  __v: number;
}

export interface IUseChartLegend {
  legendPayload: any;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IPayload {
  color: string;
  dataKey: string;
  inactive: boolean;
  type: LegendType;
  value: string;
}

export interface IGroupedReport {
  formattedDate: Date;
  [key: string]: Date | { cpi: number; conversions: number };
}

export interface ICurrentReports {
  date: string;
  [x: string]: string;
}

//КЛЮЧИ ДЛЯ ОТРИСОВКИ ГРАФИКА
export enum MetricsKeys {
  CPI = 'cpi',
  CONVERSIONS = 'conversions',
}

export interface IMetricsKeys {
  CPI: string;
  CONVERSIONS: string;
}
