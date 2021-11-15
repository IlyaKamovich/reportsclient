import React from 'react';
import { Legend } from 'recharts';
import { MetricsKeys } from './constants';
import { ILegendData } from './models';

interface Props {
  dataKey: MetricsKeys;
  trendline: boolean;
}

const ChartLegend: React.FC<Props> = (props) => {
  const { dataKey, trendline } = props;

  const getLegendData = (dataKey: MetricsKeys, trendline: boolean): Array<ILegendData> => {
    const base: Array<ILegendData> = [{ id: dataKey, value: dataKey, type: 'circle', color: '#c0392b' }];

    if (trendline) {
      base.push({ id: 'trendline', value: 'trendline', type: 'line', color: '#e74c3c' });
    }

    return base;
  };

  return <Legend verticalAlign="top" height={36} payload={getLegendData(dataKey, trendline)} />;
};

export default ChartLegend;
