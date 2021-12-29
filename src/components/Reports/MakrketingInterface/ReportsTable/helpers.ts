import moment from 'moment';
import { IReport, ITableFormat, MetricsKeys } from '../GroupedReportsChart/models';
import { IMarketingInterface } from '../models';
import { ICalculatedReportMetricsByKey, IMixedReportsResultByPediod } from './models';

class ReportsTableHelpers {
  static calculateSumOfMeticsByTableFormat = (reports: IReport[], tableFormat: ITableFormat, statisticsBy: IMarketingInterface) => {
    const currentReportsByTableFormat = this.getCurrentReportsByTableFormat(reports, tableFormat);

    const calculatedConversions = this.getSumOfMeticByMetricAndMarketingKey(
      currentReportsByTableFormat,
      MetricsKeys.CONVERSIONS,
      statisticsBy
    );
    const calculatedCpl = this.getSumOfMeticByMetricAndMarketingKey(currentReportsByTableFormat, MetricsKeys.CPI, statisticsBy);

    const uniqueReportsByTargetologs = [...new Map(reports.map((report: IReport) => [report.targetologId, report])).values()];

    const mappedCalculatedMeticsByTableFormat = this.getMappedCalculatedMetricsByTableFormat(
      calculatedConversions,
      calculatedCpl,
      tableFormat,
      statisticsBy,
      uniqueReportsByTargetologs
    );

    return mappedCalculatedMeticsByTableFormat;
  };

  static getCurrentReportsByTableFormat = (reports: IReport[], tableFormat: ITableFormat): IReport[] => {
    if (tableFormat === ITableFormat.daily) {
      const today = moment().format('DD');
      const reportsToday = reports.filter((report: IReport) => report.formattedDate === today);
      return reportsToday;
    }

    return reports;
  };

  static getSumOfMeticByMetricAndMarketingKey = (
    reports: IReport[],
    metricKey: MetricsKeys,
    statisticsBy: IMarketingInterface
  ): ICalculatedReportMetricsByKey => {
    const calculatedMetics = reports.reduce((acc: ICalculatedReportMetricsByKey, current: IReport) => {
      const key = current[statisticsBy];
      const nodeValue = acc[key];

      if (!nodeValue) {
        return { ...acc, [key]: current.metrics[metricKey] };
      }

      return { ...acc, [key]: current.metrics[metricKey] + nodeValue };
    }, {});

    return calculatedMetics;
  };

  static getMappedCalculatedMetricsByTableFormat = (
    conversios: ICalculatedReportMetricsByKey,
    cpls: ICalculatedReportMetricsByKey,
    tableFormat: ITableFormat,
    statisticsBy: IMarketingInterface,
    uniqueReportsByTargetologs: IReport[]
  ) => {
    const monthDays: number = moment().daysInMonth();

    const reportsPerDayBySourse: IMixedReportsResultByPediod[] = Object.keys(conversios).map((propKey) => {
      const conversionValue = conversios[propKey];
      const cpl = cpls[propKey];
      const cplValue = tableFormat === ITableFormat.daily ? parseFloat(cpl.toFixed(1)) : parseFloat((cpl / monthDays).toFixed(1));

      const keyName = statisticsBy === IMarketingInterface.bySources ? 'source' : 'targetologId';
      const targetologName = uniqueReportsByTargetologs.find((report: IReport) => report.targetologId === propKey)?.targetologName;

      return {
        [keyName]: propKey,
        targetologName: targetologName || '',
        conversions: conversionValue,
        cpi: cplValue,
      };
    });

    return reportsPerDayBySourse;
  };

  static getSumOfConversions = (mixedReports: IMixedReportsResultByPediod[]): number => {
    const conversionsByMonts = mixedReports.reduce((acc: number, current: IMixedReportsResultByPediod) => acc + current.conversions, 0);
    return conversionsByMonts;
  };

  static getAvgCpl = (mixedReports: IMixedReportsResultByPediod[]): number => {
    const avgCpl = mixedReports.reduce((acc: number, current: IMixedReportsResultByPediod) => acc + current.cpi, 0) / mixedReports.length;
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
