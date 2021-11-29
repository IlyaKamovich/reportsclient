import { IChartSessings } from './models';

//Percentage increase along the axis Y
export const TABLE_PERCENT_YAXIS: number = 5;

//A special color for the graph line - this is necessary so that all elements of a single line have 1 color
export const lineChartColors: Array<string> = ['#341f97', '#ee5253', '#01a3a4', '#222f3e', '#b71540', '#e58e26'];

export const chartSettings: IChartSessings = {
  responsiveContainer: {
    width: '100%',
    aspect: 5.0 / 2.0,
  },
  chartMargin: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  line: {
    strokeWidth: 4,
  },
  xAxisPadding: {
    left: 16,
    right: 16,
  },
  yAxisLabel: {
    angle: -90,
    position: 'insideLeft',
    textAnchor: 'middle',
  },
  yAxisPadding: {
    top: 10,
    bottom: 10,
  },
  dotSettings: {
    strokeWidth: 6,
  },
  label: {
    fontSize: 18,
    fontWeight: 700,
    dy: -15,
    textAnchor: 'middle',
  },
  trendlineDot: {
    item: false,
  },
  legend: {
    height: 36,
    verticalAlign: 'bottom',
    align: 'center',
    iconType: 'circle',
  },
};
