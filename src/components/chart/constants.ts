import { IChartSessings } from './models';

export interface IMetricsKeys {
  CPI: string;
  CONVERSIONS: string;
}

//ПРОЦЕНТАЖНОЕ УВЕЛЕНИЕ ГРАФИКА ПО ОСИ Y
export const TABLE_PERCENT_YAXIS: number = 5;

//КЛЮЧИ ДЛЯ ОТРИСОВКИ ГРАФИКА
export enum MetricsKeys {
  CPI = 'cpi',
  CONVERSIONS = 'conversions',
};

const chartSettings: IChartSessings = {
  responsiveContainer: {
    width: '100%',
    aspect: 5.0 / 2.0,
  },
  lineChart: {
      margin: { right: 50 }
  },
  xAxisPadding: {
    left: 15,
    right: 15,
  },
  yAxisLabel: {
    angle: -90,
    position: 'insideLeft',
    textAnchor: 'middle',
  },
  dotSettings: {
    stroke: '#c0392b',
    strokeWidth: 5,
  },
  label: {
      fontSize: 13,
  },
  trendlineDot: {
      item: false
  }
};

export { chartSettings };
