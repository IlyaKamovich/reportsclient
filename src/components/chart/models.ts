import { MetricsKeys } from './constants';

export interface IReports {
  reports: Array<IReport>;
}

export interface IReport {
  date: Date;
  targetolog: string;
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

export interface IChartSessings {
  responsiveContainer: {
    width: string;
    aspect: number;
  };
  lineChart: {
    margin: {
        right: number
    }
  },
  xAxisPadding: {
    left: number;
    right: number;
  };
  yAxisLabel: {
    angle: number;
    position: string;
    textAnchor: string;
  };
  dotSettings: {
    stroke: string;
    strokeWidth: number;
  };
  label: {
      fontSize: number;
  }
  trendlineDot: {
      item: boolean;
  }
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