import { TABLE_PERCENT_YAXIS } from './constants';
import { IGroupedReport, IReport, IReportsByKey, IReportsWithTrendline, MetricsKeys } from './models';
import { calculateTrendline } from './trendline';

class ChartHelper {
  static addToChartTrendline = (reportsByKey: Array<IReportsByKey>, dataKey: MetricsKeys): Array<IReportsWithTrendline> => {
    const reports = reportsByKey.map((item) => item[dataKey]) as Array<number>;
    const trendlineData = calculateTrendline(reports);

    const reportWithTrendline = reportsByKey.map((item, index) => ({ ...item, trendline: trendlineData[index] }));
    return reportWithTrendline;
  };

  static generateRandomColorLine = (): string => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return `#${color}`;
  };

  static calculatePercentValue = (value: number): number => Math.ceil((TABLE_PERCENT_YAXIS * value) / 100);

  static calculateDataMax = (maxValue: number, dataKey: string): number => {
    const percentageValue = this.calculatePercentValue(maxValue);

    switch (dataKey) {
      case MetricsKeys.CONVERSIONS:
        return maxValue + percentageValue + TABLE_PERCENT_YAXIS;
      case MetricsKeys.CPI:
        return maxValue + percentageValue;
      default:
        return maxValue;
    }
  };

  static calculateDataMin = (minValue: number): number => {
    const percentageValue = this.calculatePercentValue(minValue);
    const updatedMinValue = parseFloat((minValue - percentageValue).toFixed(1));

    return updatedMinValue;
  };

  static groupReportsByDate = (reports: Array<IReport>): IGroupedReport[] => {
    const groupedReports = reports.reduce((acc: any, item: IReport) => {
      const dateItem = acc.find((i: IGroupedReport) => i.date === item.formattedDate);
      if (dateItem) {
        return [
          ...acc.filter((i: IGroupedReport) => i.date !== item.formattedDate),
          { ...dateItem, [item.targetologId]: item.metrics },
        ];
      }
      return [...acc, { date: item.formattedDate, [item.targetologId]: item.metrics }];
    }, []);

    const sortedGroupedReportsByDate = ChartHelper.sortGroupedReportsByDate(groupedReports);
    return sortedGroupedReportsByDate;
  };

  static sortGroupedReportsByDate = (groupedReports: IGroupedReport[]): IGroupedReport[] => {
    const sortedReports = groupedReports.sort(
      (a, b) => new Date(a.formattedDate).getTime() - new Date(b.formattedDate).getTime()
    );

    return sortedReports;
  };
}

export { ChartHelper };
