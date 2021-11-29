import { useState, useEffect } from 'react';
import { IReport, IReports, SourceKeys } from './models';
import axios from 'axios';

interface IUseReports {
  reports: Array<IReport>;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

const useReports = (endPoint: string, startWith?: string, endOn?: string, source?: SourceKeys): IUseReports => {
  const [reports, setReports] = useState<IReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getReportsAsync();
  }, []);

  const getReportsAsync = async () => {
    try {
      const response = await axios.get<IReports>(endPoint, {
        params: {
          source: source,
          startWith: startWith,
          endOn: endOn,
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

  return { reports, loading, error, errorMessage };
};

export { useReports };
