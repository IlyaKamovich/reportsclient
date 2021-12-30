import moment from 'moment';
import { IReport, ITableFormat, MetricsKeys } from '../GroupedReportsChart/models';
import { IMarketingInterface } from '../models';
import { IMetricsBySource, IMetricsByTargetolog, ICalculatedReportMetricsByKey } from './models';

class ReportsTableHelpers {
  static calculateSumOfMetricsByTableFormat = (reports: IReport[], tableFormat: ITableFormat, statisticsBy: IMarketingInterface) => {
    const currentReportsByTableFormat = this.getCurrentReportsByTableFormat(reports, tableFormat);

    const calculatedConversions = this.getSumOfMetricByMarketingKey(currentReportsByTableFormat, MetricsKeys.CONVERSIONS, statisticsBy);
    const calculatedCpl = this.getSumOfMetricByMarketingKey(currentReportsByTableFormat, MetricsKeys.CPI, statisticsBy);

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

  static getCurrentReportsByTableFormat = (reports: IReport[], tableFormat: ITableFormat): IReport[] => {
    if (tableFormat === ITableFormat.daily) {
      const today = moment().format('DD');
      const reportsToday = reports.filter((report: IReport) => report.formattedDate === today);
      return reportsToday;
    }

    return reports;
  };

  static getSumOfMetricByMarketingKey = (
    reports: IReport[],
    metricKey: MetricsKeys,
    statisticsBy: IMarketingInterface
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
    tableFormat: ITableFormat,
    statisticsBy: IMarketingInterface,
    uniqueReportsByTargetologs: IReport[]
  ): (IMetricsBySource | IMetricsByTargetolog)[] => {
    const monthDays: number = moment().daysInMonth();

    const calculatedMetrics: (IMetricsBySource | IMetricsByTargetolog)[] = Object.keys(conversions).map((propKey) => {
      const conversionValue = conversions[propKey];
      const cpl = cpls[propKey];
      const cplValue = tableFormat === ITableFormat.daily ? parseFloat(cpl.toFixed(1)) : parseFloat((cpl / monthDays).toFixed(1));
      const targetologName = uniqueReportsByTargetologs.find((report: IReport) => report.targetologId === propKey)?.targetologName || '';

      if (statisticsBy === IMarketingInterface.bySources) {
        return {
          source: propKey,
          conversions: conversionValue,
          cpi: cplValue,
        };
      }

      return {
        targetologId: propKey,
        targetologName: targetologName,
        conversions: conversionValue,
        cpi: cplValue,
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
      calculatedMetrics.reduce((acc: number, current: IMetricsBySource | IMetricsByTargetolog) => acc + current.cpi, 0) /
      calculatedMetrics.length;
    return parseFloat(avgCpl.toFixed(2));
  };

  static capitalizeFirstLetter = (string: string): string => `${string[0].toUpperCase()}${string.slice(1)}`;

  static renderDateByFormat = (date: Date, tableFormat: ITableFormat): string => {
    const locale: string = navigator.languages !== undefined ? navigator.languages[0] : navigator.language;

    const defaultDateFormat: string = date.toLocaleDateString(locale, { day: 'numeric', month: 'long' });
    const dateFormatByMonths: string = date.toLocaleDateString(locale, { month: 'long' });

    switch (tableFormat) {
      case ITableFormat.daily:
        return defaultDateFormat;
      case ITableFormat.growing:
        return this.capitalizeFirstLetter(dateFormatByMonths);
    }
  };
}

export { ReportsTableHelpers };
