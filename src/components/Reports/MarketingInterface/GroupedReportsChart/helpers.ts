import { MarketingReportViews } from '../models';
import { MetricsKeys, IReport, IReportsByKey, IReportsWithTrendline, IGroupedReportsByDateAndDataKey, IChartData } from './models';
import { calculateTrendline } from './trendline';
import _range from 'lodash/range';
import _isNumber from 'lodash/isNumber';

class GroupedChartHelpers {
  static getChartData = (dataKey: MetricsKeys, reports: IReport[], statisticsBy: MarketingReportViews): IChartData[] => {
    const groupedData: IChartData[] = reports.reduce((acc: IChartData[], current: IReport) => {
      const node = acc.find((i: IChartData) => i.formattedDate === current.formattedDate);
      const key = current[statisticsBy];

      if (node) {
        return [
          ...acc.filter((i: IChartData) => i.formattedDate !== current.formattedDate),
          {
            ...node,
            formattedDate: current.formattedDate,
            total: current.metrics[dataKey] + node.total,
            [key]: parseFloat((current.metrics[dataKey] + Number(node[key] || 0)).toFixed(2)),
          },
        ];
      }

      return [
        ...acc,
        { formattedDate: current.formattedDate, total: current.metrics[dataKey], [key]: parseFloat(current.metrics[dataKey].toFixed(2)) },
      ];
    }, []);

    if (dataKey === MetricsKeys.CPL && statisticsBy === MarketingReportViews.bySources) {
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

      const groupedArrayByAvgCpl: IChartData[] = groupedData.map((item: IChartData, index: number) => {
        const objKeys: string[] = Object.keys(item).filter((item: string) => item !== 'formattedDate' && item !== 'total');

        const chartObj = {} as IChartData;

        for (const key of objKeys) {
          const { total } = item;
          const totalByKey = item[key] as number;
          const countByKey = groupedCountOfKeys[index][key] as number;

          const objValues = Object.values(groupedCountOfKeys[index]).filter((item: string | number) => _isNumber(item)) as number[];
          const totalCount = objValues.reduce((acc: number, current: number) => acc + current, 0);

          chartObj.formattedDate = item.formattedDate;
          chartObj.total = parseFloat((total / totalCount).toFixed(2));
          chartObj[key] = parseFloat((totalByKey / countByKey).toFixed(2));
        }

        return chartObj;
      });

      return groupedArrayByAvgCpl;
    }

    if (dataKey !== MetricsKeys.CPL) {
      return groupedData;
    }

    const countOfReportsByStatisticsKey = [...new Set(reports.map((report: IReport) => report[statisticsBy]))].length;

    const avgSumOfCpl = groupedData.map((report: IChartData) => {
      return { ...report, total: parseFloat((report.total / countOfReportsByStatisticsKey).toFixed(2)) };
    });

    return avgSumOfCpl;
  };

  static addToChartTrendline = (reportsByKey: IReportsByKey[], dataKey: MetricsKeys): IReportsWithTrendline[] => {
    const reports = reportsByKey.map((item) => item[dataKey]) as number[];
    const trendlineData = calculateTrendline(reports);

    const reportWithTrendline = reportsByKey.map((item, index) => ({ ...item, trendline: trendlineData[index] }));
    return reportWithTrendline;
  };

  static getDefaultTicks = (chartData: IChartData[], selectedOptionsLength: number): number[] => {
    if (selectedOptionsLength === 0) {
      const defaultTicks = chartData.map((item) => item.total);
      return defaultTicks;
    }

    const defaultTicks = chartData.map(({ total, formattedDate, ...rest }) => rest).flatMap(Object.values);
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
