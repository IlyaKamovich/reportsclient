import React, { useEffect, useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Dot } from 'recharts';
import { IChartData, IReport, MetricsKeys } from './models';
import { CHART_OPTIONS, CHART_COLORS, Y_AXIS_TICKS_OPTIONS, Y_AXIS_WIDTH } from './constants';
import { IMarketingInterface } from '../models';
import { GroupedChartHelpers } from './helpers';
import { CustomTooltip } from './GroupedChartTooltip';

interface Props {
  selectedOptions: string[];
  trendline?: boolean;
  statisticsBy: IMarketingInterface;
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
    () => (dataKey === MetricsKeys.CONVERSIONS ? Y_AXIS_WIDTH.CONVERSIONS_CHART : Y_AXIS_WIDTH.CPI_CHART),
    [dataKey]
  );

  useEffect(() => {
    const SELECTED_OPTIONS_LENGTH = selectedOptions.length;

    if (SELECTED_OPTIONS_LENGTH !== 0) {
      setChartKeys(selectedOptions);
    }

    if (SELECTED_OPTIONS_LENGTH === 0) {
      const dataSet = chartData[chartData.length - 1];
      const chartLineKeys = Object.keys(dataSet).filter((e) => e === 'sumOfMetric');
      setChartKeys(chartLineKeys);
    }
  }, [selectedOptions]);

  const drawChartLines = () => {
    const chartLines = chartKeys.map((chartKey: string, index: number) => (
      <Line
        name={GroupedChartHelpers.formatChartLabel(chartKey, dataKey, selectedOptions, statisticsBy, uniqueReports)}
        isAnimationActive={line.isAnimationActive}
        fill={CHART_COLORS[index]}
        stroke={CHART_COLORS[index]}
        strokeWidth={line.strokeWidth}
        dataKey={chartKey}
        key={chartKey}
        dot={<Dot strokeWidth={line.dot.strokeWidth} fill={CHART_COLORS[index]} color={CHART_COLORS[index]} stroke={CHART_COLORS[index]} />}
      >
        <LabelList
          dataKey={chartKey}
          dy={labelList.dy}
          fontWeight={labelList.fontWeight}
          fill={CHART_COLORS[index]}
          fontSize={labelList.fontSize}
        />
        ;
      </Line>
    ));

    return chartLines;
  };

  const getYAxisTicks = (): number[] => {
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
      case MetricsKeys.CPI:
        const cplTicks = GroupedChartHelpers.calculateYAxisTiсks(
          defaultTicks,
          Y_AXIS_TICKS_OPTIONS.CPI_STEP,
          Y_AXIS_TICKS_OPTIONS.ROUND_CPI
        );
        return cplTicks;
    }
  };

  return (
    <ResponsiveContainer width={responsiveContainer.width} height={responsiveContainer.height}>
      <LineChart data={chartData} margin={lineChart.margin}>
        {drawChartLines()}
        <XAxis padding={xAxisOptions.padding} dataKey={xAxisKey} />
        <CartesianGrid vertical={cartesianGrid.vertical} />
        <YAxis
          domain={[(min: number) => min, (max: number) => max]}
          width={YAxisWidth}
          ticks={getYAxisTicks()}
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
