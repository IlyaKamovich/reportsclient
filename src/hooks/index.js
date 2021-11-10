import { useState, useEffect } from "react";
import axios from "axios";

const useReports = (endPoint) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReportsByDateAsync();
  }, []);

  const getReportsByDateAsync = async () => {
    try {
      const response = await axios.get(endPoint);
      const { reports } = await response.data;
      const reportsToday = getFilteredReports(reports);
      setReports(reportsToday);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getFilteredReports = (reports) => reports.filter((report) => new Date(report.date).getDate() === new Date().getDate());

  return [reports, loading];
};

export { useReports };
