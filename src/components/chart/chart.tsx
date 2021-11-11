import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts';
//import { ChartLabel } from './chartLabel'
import { ChartLegend } from './chartLegend';
import { chartSettings as Config } from './settings';
import { ChartHelper } from './helpers';
import { IChart } from '../../interfaces/chart';

const Chart: React.FC<IChart> = (props) => {
  const { title, dataKey, reports, trendline } = props;

  const [currentReports] = useState(ChartHelper.getReportsByKey(reports, dataKey, trendline));

  return (
    <div className="chart">
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" aspect={5.0 / 2.0}>
        <LineChart data={currentReports} margin={{ right: 50 }}>
          <Line dataKey={dataKey} stroke="#c0392b" dot={Config.dotSettings} />
          {trendline && <Line dataKey="trendline" stroke="#e74c3c" dot={false} />}
          <XAxis dataKey="targetolog" padding={Config.xAxisPadding} />
          <YAxis
            dataKey={dataKey.toString()}
            label={Config.yAxisLabel}
            domain={[
              (dataMin: number) => ChartHelper.calculateDataMin(dataMin),
              (dataMax: number) => ChartHelper.calculateDataMax(dataMax),
            ]}
          />
          <Tooltip />
          <ChartLegend dataKey={dataKey} trendline={trendline} />
          <CartesianGrid vertical={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export { Chart };

// label={<ChartLabel x={10} y={10} value={15} />}
