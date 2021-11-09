import { useState, useEffect } from "react";
import { Helpers } from "../helpers";

const useReports = (endPoint) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReportsAsync = async () => {
    try {
      let response = await fetch(endPoint);
      let json = await response.json();
      return json.reports;
    } catch (e) {
      console.log(e);
    }
  };

  const getReportsToday = (reports) => Array.isArray(reports) && reports.filter((report) => report.date.slice(0, 10) === Helpers.isToday());

  useEffect(() => {
    getReportsAsync().then((reports) => {
      const reportsToday = getReportsToday(reports);
      setReports(reportsToday);
      setLoading(false);
    });
  }, []);

  return [reports, loading];
};

export { useReports };
