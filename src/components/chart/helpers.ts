import { MetricsKeys, TABLE_PERCENT_YAXIS } from './constants';
import { IReport, IReportsByKey, IReportsWithTrendline } from './models';
import { calculateTrendline } from './trendline';

class ChartHelper {
  static getReportsByKey = (reports: Array<IReport>, dataKey: MetricsKeys, trendline?: boolean): Array<IReportsByKey> | Array<IReportsWithTrendline> => {
    const reportsByKey = reports.map((report) => ({
      targetolog: report.targetolog,
      [dataKey]: report.metrics[dataKey],
    }));

    if (trendline) {
      const reportWithTrendline = this.addToChartTrendline(reportsByKey, dataKey);
      return reportWithTrendline;
    }

    return reportsByKey;
  };

  static addToChartTrendline = (reportsByKey: Array<IReportsByKey>, dataKey: MetricsKeys): Array<IReportsWithTrendline> => {
    const reports = reportsByKey.map((item) => item[dataKey]) as Array<number>;
    const trendlineData = calculateTrendline(reports);

    const reportWithTrendline = reportsByKey.map((item, index) => ({ ...item, trendline: trendlineData[index] }));
    return reportWithTrendline;
  };

  static calculatePercentValue = (value: number): number => Math.ceil((TABLE_PERCENT_YAXIS * value) / 100);

  static calculateDataMax = (maxValue: number): number => {
    const percentageValue = this.calculatePercentValue(maxValue);
    const updatedMaxValue = maxValue + percentageValue;

    return updatedMaxValue;
  };

  static calculateDataMin = (minValue: number): number => {
    const percentageValue = this.calculatePercentValue(minValue);
    const updatedMinValue = minValue - percentageValue;

    if (updatedMinValue < 0) {
      return 0;
    }

    return updatedMinValue;
  };
}

export { ChartHelper };
