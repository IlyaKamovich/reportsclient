import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, LabelList } from 'recharts';
import ChartLabel from './ChartLabel';
import ChartLegend from './ChartLegend';
import { chartSettings as Config, MetricsKeys } from './constants';
import { ChartHelper } from './helpers';
import { IReport } from './models';

import './chart.css';

interface Props {
  title: string;
  dataKey: MetricsKeys;
  reports: Array<IReport>;
  trendline: boolean;
  chartColor: string;
  trendlineColor: string;
}

const Chart: React.FC<Props> = (props) => {
  const { title, dataKey, reports, trendline, chartColor, trendlineColor } = props;
  const { responsiveContainer, lineChart, dotSettings, label, trendlineDot, xAxisPadding, yAxisLabel } = Config;
  const [currentReports] = useState(ChartHelper.getReportsByKey(reports, dataKey, trendline));

  return (
    <div className="chart">
      <h2>{title}</h2>
      <ResponsiveContainer width={responsiveContainer.width} aspect={responsiveContainer.aspect}>
        <LineChart data={currentReports} margin={lineChart.margin}>
          <Line dataKey={dataKey} stroke={chartColor} dot={dotSettings}>
            <LabelList content={<ChartLabel chartColor={chartColor} labelFontSize={label.fontSize} />} />
          </Line>
          {trendline && <Line dataKey="trendline" stroke={trendlineColor} dot={trendlineDot.item} />}
          <XAxis dataKey="targetolog" padding={xAxisPadding} />
          <YAxis
            dataKey={dataKey}
            label={yAxisLabel}
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

export default Chart;
