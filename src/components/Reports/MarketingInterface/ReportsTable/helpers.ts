import moment from 'moment';
import { IReport, TableFormat, MetricsKeys } from '../GroupedReportsChart/models';
import { MarketingReportViews } from '../models';
import { IMetricsBySource, IMetricsByTargetolog, ICalculatedReportMetricsByKey } from './models';

class ReportsTableHelpers {
  static calculateSumOfMetricsByTableFormat = (reports: IReport[], tableFormat: TableFormat, statisticsBy: MarketingReportViews) => {
    const currentReportsByTableFormat = this.getCurrentReportsByTableFormat(reports, tableFormat);

    const calculatedConversions = this.getSumOfMetricByMarketingKey(currentReportsByTableFormat, MetricsKeys.CONVERSIONS, statisticsBy);
    const calculatedCpl = this.getSumOfMetricByMarketingKey(currentReportsByTableFormat, MetricsKeys.CPL, statisticsBy);

    const uniqueReportsByTargetologs = [...new Map(reports.map((report: IReport) => [report.targetologId, report])).values()];

    const calculatedMetrics = this.getCalculatedMetrics(
      calculatedConversions,
      calculatedCpl,
      tableFormat,
      statisticsBy,
      uniqueReportsByTargetologs
    );

    return calculatedMetrics;
  };

  static getCurrentReportsByTableFormat = (reports: IReport[], tableFormat: TableFormat): IReport[] => {
    if (tableFormat === TableFormat.daily) {
      const today = moment().format('DD');
      const reportsToday = reports.filter((report: IReport) => report.formattedDate === today);
      return reportsToday;
    }

    return reports;
  };

  static getSumOfMetricByMarketingKey = (
    reports: IReport[],
    metricKey: MetricsKeys,
    statisticsBy: MarketingReportViews
  ): ICalculatedReportMetricsByKey => {
    const sumOfMetrics = reports.reduce((acc: ICalculatedReportMetricsByKey, current: IReport) => {
      const key = current[statisticsBy];
      const nodeValue = acc[key];

      if (!nodeValue) {
        return { ...acc, [key]: current.metrics[metricKey] };
      }

      return { ...acc, [key]: current.metrics[metricKey] + nodeValue };
    }, {});

    return sumOfMetrics;
  };

  static getCalculatedMetrics = (
    conversions: ICalculatedReportMetricsByKey,
    cpls: ICalculatedReportMetricsByKey,
    tableFormat: TableFormat,
    statisticsBy: MarketingReportViews,
    uniqueReportsByTargetologs: IReport[]
  ): (IMetricsBySource | IMetricsByTargetolog)[] => {
    const monthDays: number = moment().daysInMonth();

    const calculatedMetrics: (IMetricsBySource | IMetricsByTargetolog)[] = Object.keys(conversions).map((propKey) => {
      const conversionValue = conversions[propKey];
      const cpl = cpls[propKey];
      const cplValue = tableFormat === TableFormat.daily ? parseFloat(cpl.toFixed(1)) : parseFloat((cpl / monthDays).toFixed(1));
      const targetologName = uniqueReportsByTargetologs.find((report: IReport) => report.targetologId === propKey)?.targetologName || '';

      if (statisticsBy === MarketingReportViews.bySources) {
        return {
          source: propKey,
          conversions: conversionValue,
          cpl: cplValue,
        };
      }

      return {
        targetologId: propKey,
        targetologName: targetologName,
        conversions: conversionValue,
        cpl: cplValue,
      };
    });

    return calculatedMetrics;
  };

  static getSumOfConversions = (mixedReports: (IMetricsBySource | IMetricsByTargetolog)[]): number => {
    const conversionsByMonth = mixedReports.reduce(
      (acc: number, curr: IMetricsBySource | IMetricsByTargetolog) => acc + curr.conversions,
      0
    );
    return conversionsByMonth;
  };

  static getAvgCpl = (calculatedMetrics: (IMetricsBySource | IMetricsByTargetolog)[]): number => {
    const avgCpl =
      calculatedMetrics.reduce((acc: number, current: IMetricsBySource | IMetricsByTargetolog) => acc + current.cpl, 0) /
      calculatedMetrics.length;
    return parseFloat(avgCpl.toFixed(2));
  };

  static capitalizeFirstLetter = (string: string): string => `${string[0].toUpperCase()}${string.slice(1)}`;

  static renderDateByFormat = (date: Date, tableFormat: TableFormat): string => {
    const locale: string = navigator.languages !== undefined ? navigator.languages[0] : navigator.language;

    const defaultDateFormat: string = date.toLocaleDateString(locale, { day: 'numeric', month: 'long' });
    const dateFormatByMonths: string = date.toLocaleDateString(locale, { month: 'long' });

    switch (tableFormat) {
      case TableFormat.daily:
        return defaultDateFormat;
      case TableFormat.growing:
        return this.capitalizeFirstLetter(dateFormatByMonths);
    }
  };
}

export { ReportsTableHelpers };
