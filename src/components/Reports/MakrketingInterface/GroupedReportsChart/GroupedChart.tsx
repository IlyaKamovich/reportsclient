import React, { useEffect, useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Dot } from 'recharts';
import { IChartData, IReport, MetricsKeys, ISelectOption } from './models';
import { ChartOptions, lineChartColors, Y_AXIS_TICKS_OPTIONS } from './constants';
import { IMarketingInterface } from '../models';
import { GroupedChartHelpers } from './helpers';
import { CustomTooltip } from './GroupedChartTooltip';
import { PropsValue } from 'react-select';

interface Props {
  optionSelected: PropsValue<ISelectOption>;
  trendline?: boolean;
  statisticsBy: IMarketingInterface;
  chartData: IChartData[];
  dataKey: MetricsKeys;
  reports: IReport[];
}

const GroupedChart: React.FC<Props> = ({ dataKey, optionSelected, statisticsBy, chartData, reports }) => {
  const { responsiveContainer, lineChart, xAxisOptions, yAxisOptions, line, labelList, cartesianGrid, legend } = ChartOptions;
  const [chartKeys, setChartKeys] = useState<string[]>([]);
  const [xAxisKey]: string[] = useMemo(() => Object.keys(chartData[0]), [chartData]);
  const uniqueReports = useMemo(() => GroupedChartHelpers.getUniqueReports(reports), [reports]);

  useEffect(() => {
    if (!optionSelected) {
      return;
    }

    const SELECTED_OPTIONS_LENGTH = Object.keys(optionSelected).length;

    if (SELECTED_OPTIONS_LENGTH !== 0 && Array.isArray(optionSelected)) {
      const chartLineKeys = optionSelected.map((i: ISelectOption) => i.value);
      setChartKeys(chartLineKeys);
    }

    if (SELECTED_OPTIONS_LENGTH === 0) {
      const dataSet = chartData[chartData.length - 1];
      const chartLineKeys = Object.keys(dataSet).filter((e) => e === 'sumOfMetric');
      setChartKeys(chartLineKeys);
    }
  }, [optionSelected]);

  const drawChartLines = () => {
    const chartLines = chartKeys.map((chartKey: string, index: number) => (
      <Line
        name={GroupedChartHelpers.formatChartLabel(chartKey, dataKey, optionSelected, statisticsBy, uniqueReports)}
        isAnimationActive={line.isAnimationActive}
        fill={lineChartColors[index]}
        stroke={lineChartColors[index]}
        strokeWidth={line.strokeWidth}
        dataKey={chartKey}
        key={chartKey}
        dot={<Dot strokeWidth={line.dot.strokeWidth} fill={lineChartColors[index]} color={lineChartColors[index]} stroke={lineChartColors[index]} />}
      >
        <LabelList dataKey={chartKey} dy={labelList.dy} fontWeight={labelList.fontWeight} fill={lineChartColors[index]} fontSize={labelList.fontSize} />;
      </Line>
    ));

    return chartLines;
  };

  const getYAxisTicks = (): number[] => {
    if (!optionSelected) {
      return [];
    }

    const SELECTED_OPTIONS_LENGTH = Object.keys(optionSelected).length;
    const defaultTicks = GroupedChartHelpers.getDefaultTicks(chartData, SELECTED_OPTIONS_LENGTH);

    switch (dataKey) {
      case MetricsKeys.CONVERSIONS:
        const conversionsTicks = GroupedChartHelpers.calculateYAxisTiсks(defaultTicks, Y_AXIS_TICKS_OPTIONS.CONVERSIONS_STEP, Y_AXIS_TICKS_OPTIONS.ROUND_CONVERSIONS);
        return conversionsTicks;
      case MetricsKeys.CPI:
        const cplTicks = GroupedChartHelpers.calculateYAxisTiсks(defaultTicks, Y_AXIS_TICKS_OPTIONS.CPI_STEP, Y_AXIS_TICKS_OPTIONS.ROUND_CPI);
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
          width={dataKey === MetricsKeys.CONVERSIONS ? 40 : 35}
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
