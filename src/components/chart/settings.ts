import { IChartSessings } from '../../interfaces/chart';

const chartSettings: IChartSessings = {
  xAxisPadding: {
    left: 15,
    right: 15,
  },
  yAxisLabel: {
    angle: -90,
    position: "insideLeft",
    textAnchor: "middle",
  },
  dotSettings: {
    stroke: "#c0392b",
    strokeWidth: 5,
  },
};

export { chartSettings };