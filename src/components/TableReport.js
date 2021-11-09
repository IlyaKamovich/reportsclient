const TableReports = ({ reports }) => {
  return (
    <table className="reports">
      <thead>
        <tr>
          <th>Targetolog</th>
          <th>Conversions</th>
          <th>CPI</th>
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
