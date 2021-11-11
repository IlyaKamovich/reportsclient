import { useState, useEffect } from "react";
import axios from "axios";

import { IReports, IReport } from '../interfaces/reports';

const useReports = (endPoint: string): [IReport[], boolean, boolean, string] => {
  const [reports, setReports] = useState<IReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getReportsByDateAsync();
  }, []);

  const getReportsByDateAsync = async () => {
    try {
      const response = await axios.get<IReports>(endPoint);
      const { reports } = response.data;
      const reportsToday = getFilteredReports(reports);
      setReports(reportsToday);
      setLoading(false);
    } catch (e: any) {
        setError(true);
        setErrorMessage(e.message);
    }
  };

  const getFilteredReports = (reports: Array<IReport>): Array<IReport> => {
      return reports.filter((report) => new Date(report.date).getDate() === new Date().getDate())
  };

  return [reports, loading, error, errorMessage];
};

export { useReports };