import { useState, useEffect } from 'react';
import { IReport, SourceKeys, IReports, IFirstAndLastDayInMonth } from './GroupedReportsChart/models';
import axios from 'axios';

interface IUseReports {
  reports: IReport[];
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

const useReports = (endPoint: string, startWith?: Date, endOn?: Date, source?: SourceKeys): IUseReports => {
  const [reports, setReports] = useState<IReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const getReportsAsync = async () => {
      try {
        const { firstDayOfMonth, lastDayOfMonth } = getFirstAndLastDayInMonth();

        const response = await axios.get<IReports>(endPoint, {
          params: {
            source: source,
            startWith: startWith || firstDayOfMonth,
            endOn: endOn || lastDayOfMonth,
          },
        });

        const { reports } = response.data;

        setReports(reports);
        setLoading(false);
      } catch (e: any) {
        setError(true);
        setErrorMessage(e.message);
        setLoading(false);
      }
    };

    getReportsAsync();
  }, [startWith, endOn, source, endPoint]);

  //Finding the first and last day of the month for the rising chart
  const getFirstAndLastDayInMonth = (): IFirstAndLastDayInMonth => {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 1);

    return { firstDayOfMonth, lastDayOfMonth };
  };

  return { reports, loading, error, errorMessage };
};

export { useReports };
