import { MarketingReportViews } from '../models';
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
import _sortBy from 'lodash/sortBy';
import _values from 'lodash/values';
import _merge from 'lodash/merge';
import _keyBy from 'lodash/keyBy';

class GroupedChartHelpers {
  static getCurrentChartData = (dataKey: MetricsKeys, reports: IReport[], statisticsBy: MarketingReportViews): IChartData[] => {
    const sumOfMetricsByDataKey = GroupedChartHelpers.getSumOfMetricsByDataKey(dataKey, reports, statisticsBy);
    const groupedReportsByDataAndStatisticKey = GroupedChartHelpers.getGroupedReportsByDataAndStatisticKey(reports, dataKey, statisticsBy);

    const mergedKey = 'formattedDate';
    const sortedChartData = _sortBy(
      _values(_merge(_keyBy(sumOfMetricsByDataKey, mergedKey), _keyBy(groupedReportsByDataAndStatisticKey, mergedKey))),
      [mergedKey]
    );

    return sortedChartData;
  };

  static getSumOfMetricsByDataKey = (dataKey: MetricsKeys, reports: IReport[], statisticsBy: MarketingReportViews): ISumReport[] => {
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

    if (dataKey !== MetricsKeys.CPL) {
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
    statisticsBy: MarketingReportViews
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

    if (statisticsBy == MarketingReportViews.byTargetologs) {
      return groupedArray;
    }

    const groupedCountOfKeys = reports.reduce((acc: IGroupedReportsByDateAndDataKey[], curr: IReport) => {
      const node = acc.find((i) => i.formattedDate === curr.formattedDate);

      if (node) {
        return [
          ...acc.filter((i) => i.formattedDate !== curr.formattedDate),
          {
            ...node,
            formattedDate: curr.formattedDate,
            [curr.targetologSource]: ((node[curr.targetologSource] as number) || 0) + 1,
          },
        ];
      }

      return [...acc, { formattedDate: curr.formattedDate, [curr.targetologSource]: [curr.targetologSource].length }];
    }, []);

    const groupedArrayByAvgCpl: IGroupedReportsByDateAndDataKey[] = groupedArray.map(
      (item: IGroupedReportsByDateAndDataKey, index: number) => {
        const objKeys: string[] = Object.keys(item).filter((item: string) => item !== 'formattedDate');

        const objWithAvgCpl: IGroupedReportsByDateAndDataKey = objKeys.reduce((acc: any, key: string) => {
          const total = item[key] as number;
          const count = groupedCountOfKeys[index][key] as number;

          return {
            ...acc,
            [key]: parseFloat((total / count).toFixed(2)),
            formattedDate: item.formattedDate,
          };
        }, {});

        return objWithAvgCpl;
      }
    );

    return groupedArrayByAvgCpl;
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
    statisticsBy: MarketingReportViews,
    uniqueReports: IReport[]
  ): string => {
    if (dataKey === MetricsKeys.CPL && selectedOptions.length === 0) {
      return 'Средний цпл';
    }

    if (dataKey === MetricsKeys.CONVERSIONS && selectedOptions.length === 0) {
      return 'Количество заявок';
    }

    if (statisticsBy === MarketingReportViews.byTargetologs) {
      const currentLegendLabel = uniqueReports.find((el: IReport) => el.targetologId === chartKey)?.targetologName;
      return currentLegendLabel || chartKey;
    }

    return chartKey;
  };
}

export { GroupedChartHelpers };
