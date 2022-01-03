import { useEffect, useState } from 'react';
import { IChartData } from './models';

const useSelectOptions = (chartData: IChartData[]): string[] => {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const selectOptions = Object.keys(chartData[0]).filter((el) => el !== 'formattedDate' && el !== 'sumOfMetric');
    setOptions(selectOptions);
  }, [chartData]);

  return options;
};

export { useSelectOptions };
