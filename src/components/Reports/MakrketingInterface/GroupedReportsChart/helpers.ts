import { IMarketingInterface } from '../models';
import {
  MetricsKeys,
  IReport,
  ISumReport,
  IReportsByKey,
  IReportsWithTrendline,
  IGroupedReportsByDateAndDataKey,
  IChartData,
} from './models';
import { calculateTrendline } from './trendline';
import _range from 'lodash/range';

class GroupedChartHelpers {
  static getCurrentChartData = (dataKey: MetricsKeys, reports: IReport[], statisticsBy: IMarketingInterface): IChartData[] => {
    const sumOfMetricsByDataKey = GroupedChartHelpers.getSumOfMetricsByDataKey(dataKey, reports, statisticsBy);
    const groupedReportsByDataAndStatisticKey = GroupedChartHelpers.getGroupedReportsByDataAndStatisticKey(reports, dataKey, statisticsBy);

    const chartData = sumOfMetricsByDataKey.map((item, index) => {
      return {
        ...item,
        ...groupedReportsByDataAndStatisticKey.find((itmInner) => itmInner.formattedDate === sumOfMetricsByDataKey[index].formattedDate),
      };
    });

    return chartData;
  };

  static getSumOfMetricsByDataKey = (dataKey: MetricsKeys, reports: IReport[], statisticsBy: IMarketingInterface): ISumReport[] => {
    const sumOfMetricsByKey = reports.reduce((acc: ISumReport[], current: IReport) => {
      const data = acc.find((i: ISumReport) => i.formattedDate === current.formattedDate);

      if (!data) {
        return [...acc, { formattedDate: current.formattedDate, sumOfMetric: current.metrics[dataKey] }];
      }

      return [
        ...acc.filter((i: ISumReport) => i.formattedDate !== data.formattedDate),
        { formattedDate: current.formattedDate, sumOfMetric: current.metrics[dataKey] + data.sumOfMetric },
      ];
    }, []);

    if (dataKey !== MetricsKeys.CPI) {
      return sumOfMetricsByKey;
    }

    const countOfReportsByStatisticsKey = [...new Set(reports.map((report: IReport) => report[statisticsBy]))].length;

    const avgSumOfCpl = sumOfMetricsByKey.map((report: ISumReport) => {
      return { ...report, sumOfMetric: parseFloat((report.sumOfMetric / countOfReportsByStatisticsKey).toFixed(2)) };
    });

    return avgSumOfCpl;
  };

  static getGroupedReportsByDataAndStatisticKey = (
    reports: IReport[],
    dataKey: MetricsKeys,
    statisticsBy: IMarketingInterface
  ): IGroupedReportsByDateAndDataKey[] => {
    const groupedArray = reports.reduce((acc: IGroupedReportsByDateAndDataKey[], current: IReport) => {
      const nodeReport = acc.find((i) => i.formattedDate === current.formattedDate);
      const key = current[statisticsBy];

      if (nodeReport) {
        return [
          ...acc.filter((i: IGroupedReportsByDateAndDataKey) => i.formattedDate !== current.formattedDate),
          { ...nodeReport, [key]: parseFloat((current.metrics[dataKey] + Number(nodeReport[key] || 0)).toFixed(2)) },
        ];
      }

      return [...acc, { formattedDate: current.formattedDate, [key]: parseFloat(current.metrics[dataKey].toFixed(2)) }];
    }, []);

    return groupedArray;
  };

  static addToChartTrendline = (reportsByKey: IReportsByKey[], dataKey: MetricsKeys): IReportsWithTrendline[] => {
    const reports = reportsByKey.map((item) => item[dataKey]) as number[];
    const trendlineData = calculateTrendline(reports);

    const reportWithTrendline = reportsByKey.map((item, index) => ({ ...item, trendline: trendlineData[index] }));
    return reportWithTrendline;
  };

  static getDefaultTicks = (chartData: IChartData[], selectedOptionsLength: number): number[] => {
    if (selectedOptionsLength === 0) {
      const defaultTicks = chartData.map((item) => item.sumOfMetric);
      return defaultTicks;
    }

    const defaultTicks = chartData.map(({ sumOfMetric, formattedDate, ...rest }) => rest).flatMap(Object.values);
    return defaultTicks;
  };

  static calculateYAxisTiсks = (defaultTicks: number[], tickStep: number, roundTickTo: number): number[] => {
    const roundUp = (a: number, b: number) => Math.ceil(a / b) * b;
    const roundDown = (a: number, b: number) => Math.floor(a / b) * b;

    const minTick = roundDown(Math.min(...defaultTicks), roundTickTo);
    const maxTick = roundUp(Math.max(...defaultTicks), roundTickTo);

    const yAxisTicks = _range(minTick, maxTick + tickStep, tickStep).map((tick) => parseFloat(tick.toFixed(2)));
    return yAxisTicks;
  };

  static getUniqueReports = (reports: IReport[]) => [...new Map(reports.map((report: IReport) => [report.targetologId, report])).values()];

  static formatSelectOption = (defaultOption: string, reports: IReport[]): string => {
    const uniqueReports = this.getUniqueReports(reports);
    return uniqueReports.find((report) => report.targetologId === defaultOption)?.targetologName || defaultOption;
  };

  static formatChartLabel = (
    chartKey: string,
    dataKey: MetricsKeys,
    selectedOptions: string[],
    statisticsBy: IMarketingInterface,
    uniqueReports: IReport[]
  ): string => {
    if (dataKey === MetricsKeys.CPI && selectedOptions.length === 0) {
      return 'Средний цпл';
    }

    if (dataKey === MetricsKeys.CONVERSIONS && selectedOptions.length === 0) {
      return 'Количество заявок';
    }

    if (statisticsBy === IMarketingInterface.byTargetologs) {
      const currentLegendLabel = uniqueReports.find((el: IReport) => el.targetologId === chartKey)?.targetologName;
      return currentLegendLabel || chartKey;
    }

    return chartKey;
  };
}

export { GroupedChartHelpers };
