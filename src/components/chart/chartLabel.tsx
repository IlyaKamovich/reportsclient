import React from 'react';
interface Props {
  x?: number;
  y?: number;
  value?: number;
  chartColor: string;
  labelFontSize: number;
}

const ChartLabel: React.FC<Props> = (props) => {
  const { x, y, value, chartColor, labelFontSize } = props;

  return (
    <text x={x} y={y} dy={-10} fill={chartColor} fontSize={labelFontSize} textAnchor="middle">
      {value}
    </text>
  );
};

export default ChartLabel;
