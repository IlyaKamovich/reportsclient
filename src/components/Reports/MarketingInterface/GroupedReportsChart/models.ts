import { ReactElement, SVGProps } from 'react';
import { LegendType } from 'recharts';

export interface IReport {
  _id: string;
  date: Date;
  targetologId: string;
  targetologName: string;
  targetologSource: string;
  formattedDate: string;
  metrics: {
    conversions: number;
    cpl: number;
  };
}

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

export enum MetricsKeys {
  CPL = 'cpl',
  CONVERSIONS = 'conversions',
}

export interface IFirstAndLastDayInMonth {
  firstDayOfMonth: Date;
  lastDayOfMonth: Date;
}

export interface IGroupedReportsByDateAndDataKey {
  formattedDate: string;
  [key: string]: string | number;
}

export enum TableFormat {
  daily = 'daily',
  growing = 'growing',
}

export interface IChartData {
  [key: string]: number | string;
  formattedDate: string;
  total: number;
}

export interface IPayloadTooltip {
  color: string;
  dataKey: string;
  fill: string;
  inactive: boolean;
  value: string;
  name: string;
  payload: IPayloadTooltipItems[];
  stroke: string;
  strokeWidth: number;
}

export interface IPayloadTooltipItems {
  [key: string]: string | number;
}

export type ScaleType = 'auto' | 'linear' | 'pow' | 'band';

export type AxisInterval = number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd';

export interface IChartOptions {
  responsiveContainer: {
    width: string;
    height: string;
  };
  lineChart: {
    margin: {
      top: number;
      right: number;
      left: number;
      bottom: number;
    };
  };
  line: {
    isAnimationActive: boolean;
    animationBegin?: number;
    strokeWidth: number;
    dot: {
      strokeWidth: number;
      fill?: string;
      color?: string;
      stroke?: string;
    };
  };
  labelList: {
    dy: number;
    fontWeight: number;
    fill?: string;
    fontSize: number;
  };
  xAxisOptions: {
    padding: {
      left: number;
      right: number;
    };
  };
  yAxisOptions: {
    tickSize: number;
    minTickGap: number;
    interval: AxisInterval;
    scale: ScaleType | Function;
    tickMargin: number;
  };
  cartesianGrid: {
    vertical: SVGProps<SVGLineElement> | ReactElement<SVGElement> | ((props: any) => ReactElement<SVGElement>) | boolean;
  };
  legend: {
    type: Omit<LegendType, 'none'>;
  };
}

export interface IYAxisTicksOptions {
  ROUND_CONVERSIONS: number;
  CONVERSIONS_STEP: number;
  CPL_STEP: number;
  ROUND_CPL: number;
}

export interface IYAxisWidth {
  CONVERSIONS_CHART: number;
  CPL_CHART: number;
}
