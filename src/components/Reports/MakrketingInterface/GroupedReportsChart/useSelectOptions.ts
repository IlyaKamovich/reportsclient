import { useEffect, useState } from 'react';
import { IMarketingInterface } from '../models';
import { IReport, ISelectOption, IChartData } from './models';
import { GroupedChartHelpers } from './helpers';

const useSelectOptions = (reports: IReport[], chartData: IChartData[], statisticsBy: IMarketingInterface) => {
  const [options, setOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    const uniqueReports = GroupedChartHelpers.getUniqueReports(reports);
    const currentOptions = getSelectOptions(chartData[0], statisticsBy, uniqueReports);
    setOptions(currentOptions);
  }, [chartData]);

  const getSelectOptions = (dataObject: IChartData, statisticsBy: IMarketingInterface, uniqueReports: IReport[]): ISelectOption[] => {
    const dataSet = Object.keys(dataObject).filter((el) => el !== 'formattedDate' && el !== 'sumOfMetric');

    const selectOptions = dataSet.map((dataSetItem: string) => ({
      value: dataSetItem,
      label: statisticsBy === IMarketingInterface.byTargetologs ? uniqueReports.find((report) => report.targetologId === dataSetItem)?.targetologName : dataSetItem,
    }));

    return selectOptions;
  };

  return options;
};

export { useSelectOptions };
