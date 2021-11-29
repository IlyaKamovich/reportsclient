import React, { useMemo } from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line, LabelList, Legend } from 'recharts';
import { chartSettings as Config, lineChartColors } from './constants';
import { IReport, MetricsKeys } from './models';
import { ChartHelper } from './helpers';
import ChartLegend from './ChartLegend';
import ChartDot from './ChartDot';
import './chart.css';

interface Props {
  dataKey: MetricsKeys;
  reports: Array<IReport>;
  trendline: boolean;
}

const Chart: React.FC<Props> = (props) => {
  const { dataKey, reports } = props;
  const { chartMargin, responsiveContainer, label, yAxisLabel, yAxisPadding, xAxisPadding, dotSettings, line, legend } = Config;
  const groupedReports = useMemo(() => ChartHelper.groupReportsByDate(reports), [reports]);

  const drawСhartLines = () => {
    const dataSet = groupedReports[0];
    const lines = [];
    let colorIndex = 0;

    for (let i in dataSet) {
      if (dataSet.hasOwnProperty(i) && i !== 'date') {
        lines.push(
          <Line
            fill={lineChartColors[colorIndex]}
            dataKey={`${i}.${dataKey}`}
            stroke={lineChartColors[colorIndex]}
            strokeWidth={line.strokeWidth}
            dot={<ChartDot colorIndex={colorIndex} strokeWidth={dotSettings.strokeWidth} />}
            key={i}
          >
            <LabelList
              dy={label.dy}
              fontWeight={label.fontWeight}
              fill={lineChartColors[colorIndex]}
              fontSize={label.fontSize}
              textAnchor={label.textAnchor}
            />
          </Line>
        );

        colorIndex++;
      }
    }

    return lines;
  };

  return (
    <ResponsiveContainer width={responsiveContainer.width} aspect={responsiveContainer.aspect}>
      <LineChart margin={chartMargin} data={groupedReports}>
        {drawСhartLines()}
        <XAxis padding={xAxisPadding} dataKey="date" />
        <YAxis
          padding={yAxisPadding}
          label={yAxisLabel}
          domain={[
            (dataMin: number) => ChartHelper.calculateDataMin(dataMin),
            (dataMax: number) => ChartHelper.calculateDataMax(dataMax, dataKey),
          ]}
        />
        <Legend
          verticalAlign={legend.verticalAlign}
          align={legend.align}
          iconType={legend.iconType}
          height={legend.height}
          content={<ChartLegend reports={reports} />}
        />
        <CartesianGrid vertical={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
