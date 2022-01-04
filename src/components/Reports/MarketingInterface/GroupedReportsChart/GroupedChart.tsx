import React, { useEffect, useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Dot } from 'recharts';
import { CHART_OPTIONS, CHART_COLORS, Y_AXIS_TICKS_OPTIONS, Y_AXIS_WIDTH } from './constants';
import { IChartData, IReport, MetricsKeys } from './models';
import { CustomTooltip } from './GroupedChartTooltip';
import { MarketingReportViews } from '../models';
import { GroupedChartHelpers } from './helpers';

interface Props {
  selectedOptions: string[];
  trendline?: boolean;
  statisticsBy: MarketingReportViews;
  chartData: IChartData[];
  dataKey: MetricsKeys;
  reports: IReport[];
}

const GroupedChart: React.FC<Props> = ({ dataKey, selectedOptions, statisticsBy, chartData, reports }) => {
  const { responsiveContainer, lineChart, xAxisOptions, yAxisOptions, line, labelList, cartesianGrid, legend } = CHART_OPTIONS;
  const [chartKeys, setChartKeys] = useState<string[]>([]);
  const [xAxisKey]: string[] = useMemo(() => Object.keys(chartData[0]), [chartData]);
  const uniqueReports = useMemo(() => GroupedChartHelpers.getUniqueReports(reports), [reports]);
  const YAxisWidth = useMemo(
    () => (dataKey === MetricsKeys.CONVERSIONS ? Y_AXIS_WIDTH.CONVERSIONS_CHART : Y_AXIS_WIDTH.CPL_CHART),
    [dataKey]
  );

  const yAxisTicks = useMemo(() => {
    const SELECTED_OPTIONS_LENGTH = selectedOptions.length;
    const defaultTicks = GroupedChartHelpers.getDefaultTicks(chartData, SELECTED_OPTIONS_LENGTH);

    switch (dataKey) {
      case MetricsKeys.CONVERSIONS:
        const conversionsTicks = GroupedChartHelpers.calculateYAxisTiсks(
          defaultTicks,
          Y_AXIS_TICKS_OPTIONS.CONVERSIONS_STEP,
          Y_AXIS_TICKS_OPTIONS.ROUND_CONVERSIONS
        );
        return conversionsTicks;
      case MetricsKeys.CPL:
        const cplTicks = GroupedChartHelpers.calculateYAxisTiсks(
          defaultTicks,
          Y_AXIS_TICKS_OPTIONS.CPL_STEP,
          Y_AXIS_TICKS_OPTIONS.ROUND_CPL
        );
        return cplTicks;
    }
  }, [selectedOptions]);

  useEffect(() => {
    const SELECTED_OPTIONS_LENGTH = selectedOptions.length;

    if (SELECTED_OPTIONS_LENGTH !== 0) {
      setChartKeys(selectedOptions);
      return;
    }

    const dataSet = chartData[chartData.length - 1];
    const chartLineKeys = Object.keys(dataSet).filter((e) => e === 'total');
    setChartKeys(chartLineKeys);
  }, [selectedOptions]);

  return (
    <ResponsiveContainer width={responsiveContainer.width} height={responsiveContainer.height}>
      <LineChart data={chartData} margin={lineChart.margin}>
        {chartKeys.map((chartKey: string, index: number) => {
          const lineColor: string = CHART_COLORS[index];
          return (
            <Line
              name={GroupedChartHelpers.formatChartLabel(chartKey, dataKey, selectedOptions, statisticsBy, uniqueReports)}
              isAnimationActive={line.isAnimationActive}
              fill={lineColor}
              stroke={lineColor}
              strokeWidth={line.strokeWidth}
              dataKey={chartKey}
              key={chartKey}
              dot={<Dot strokeWidth={line.dot.strokeWidth} fill={lineColor} color={lineColor} stroke={lineColor} />}
            >
              <LabelList
                dataKey={chartKey}
                dy={labelList.dy}
                fontWeight={labelList.fontWeight}
                fill={lineColor}
                fontSize={labelList.fontSize}
              />
            </Line>
          );
        })}
        <XAxis padding={xAxisOptions.padding} dataKey={xAxisKey} />
        <CartesianGrid vertical={cartesianGrid.vertical} />
        <YAxis
          domain={[(min: number) => min, (max: number) => max]}
          width={YAxisWidth}
          ticks={yAxisTicks}
          tickMargin={yAxisOptions.tickMargin}
          minTickGap={yAxisOptions.minTickGap}
          tickSize={yAxisOptions.tickSize}
          interval={yAxisOptions.interval}
          scale={yAxisOptions.scale}
        />
        <Legend iconType={legend.type} />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GroupedChart;
