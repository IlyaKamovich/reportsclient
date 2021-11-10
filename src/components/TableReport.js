import { TABLE_REPORT_CAPTIONS } from "../constants";

const TableReports = ({ reports }) => {
  return (
    <table className="reports">
      <thead>
        <tr>
          {TABLE_REPORT_CAPTIONS.map((caption, index) => {
            return <th key={index}>{caption}</th>;
          })}
        </tr>
      </thead>

      <tbody>
        {reports.map((report, index) => {
          return (
            <tr key={index}>
              <td>{report.targetolog}</td>
              <td>{report.metrics.conversions}</td>
              <td>{report.metrics.cpi}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { TableReports };
