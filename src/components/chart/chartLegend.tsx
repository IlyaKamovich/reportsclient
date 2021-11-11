import React from 'react';
import { Legend } from 'recharts';
import { IChartLegend, ILegendData } from '../../interfaces/chart';

const ChartLegend: React.FC<IChartLegend> = (props) => {
  const { dataKey, trendline } = props;

  const getLegendData = (dataKey: string, trendline: boolean): Array<ILegendData> => {
    const base: Array<ILegendData> = [{ id: dataKey, value: dataKey, type: 'circle', color: '#c0392b' }];

    if (trendline) {
      base.push({ id: 'trendline', value: 'trendline', type: 'line', color: '#e74c3c' });
    }

    return base;
  };

  return <Legend verticalAlign="top" height={36} payload={getLegendData(dataKey, trendline)} />;
};

export { ChartLegend };
