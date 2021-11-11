import React from 'react';

import { IChartLabel } from '../../interfaces/chart';

const ChartLabel: React.FC<IChartLabel> = (props) => {
  const { x, y, value } = props;

  return (
    <text x={x} y={y} dy={-13} fill="#c0392b" fontSize={15} textAnchor="middle">
      {value}
    </text>
  );
};

export { ChartLabel };
