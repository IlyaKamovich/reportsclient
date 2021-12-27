import { IChartOptions } from './models';

//A special color for the graph line - this is necessary so that all elements of a single line have 1 color
export const lineChartColors: string[] = ['#341f97', '#ee5253', '#01a3a4', '#222f3e', '#b71540'];

export const ChartOptions: IChartOptions = {
  responsiveContainer: {
    width: '100%',
    height: '100%',
  },
  lineChart: {
    margin: {
      top: 15,
      right: 5,
      left: 0,
      bottom: 5,
    },
  },
  line: {
    isAnimationActive: false,
    strokeWidth: 2,
    dot: {
      strokeWidth: 3,
    },
  },
  labelList: {
    dy: -22,
    fontWeight: 500,
    fontSize: 13,
  },
  xAxisOptions: {
    padding: {
      left: 16,
      right: 16,
    },
  },
  yAxisOptions: {
    tickSize: 5,
    minTickGap: 0.2,
    interval: 'preserveStart',
    scale: 'linear',
    tickMargin: 3,
  },
  cartesianGrid: {
    vertical: false,
  },
  legend: {
    type: 'circle',
  },
};

export const Y_AXIS_TICKS_OPTIONS = {
  ROUND_CONVERSIONS: 100,
  CONVERSIONS_STEP: 100,
  CPI_STEP: 0.2,
  ROUND_CPI: 1,
};
