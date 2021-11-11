import { TABLE_PERCENT_YAXIS } from '../../constants';
import { calculateTrendline } from '../../components/chart/trendline';

class ChartHelper {
  static getReportsByKey = (reports, dataKey, trendline) => {
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

  static addToChartTrendline = (reportsByKey, dataKey) => {
    const reports = reportsByKey.map((item) => item[dataKey]);

    const trendlineData = calculateTrendline(reports);

    const reportWithTrendline = reportsByKey.map((item, index) => ({ ...item, trendline: trendlineData[index] }));

    return reportWithTrendline;
  };

  static calculatePercentValue = (value) => Math.ceil((TABLE_PERCENT_YAXIS * value) / 100);

  static calculateDataMax = (maxValue) => {
    const percentageValue = this.calculatePercentValue(maxValue);
    const updatedMaxValue = maxValue + percentageValue;

    return updatedMaxValue;
  };

  static calculateDataMin = (minValue) => {
    const percentageValue = this.calculatePercentValue(minValue);
    const updatedMinValue = minValue - percentageValue;

    if (updatedMinValue < 0) {
      return 0;
    }

    return updatedMinValue;
  };
}

export { ChartHelper };
