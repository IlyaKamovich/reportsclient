import React from 'react';
import { Dot, DotProps } from 'recharts';
import { lineChartColors } from './constants';

interface Props extends DotProps {
  colorIndex: number;
  strokeWidth: number;
}

const ChartDot: React.FC<Props> = (props) => {
  const { colorIndex, cx, cy, r, strokeWidth } = props;

  return (
    <Dot
      strokeWidth={strokeWidth}
      r={r}
      cx={cx}
      cy={cy}
      fill={lineChartColors[colorIndex]}
      color={lineChartColors[colorIndex]}
      stroke={lineChartColors[colorIndex]}
    />
  );
};

export default ChartDot;
