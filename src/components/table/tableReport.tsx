import React from 'react';
import { pick } from 'lodash';
import { TABLE_REPORT_CAPTIONS } from '../../constants';
import { IReports } from '../../interfaces/reports';

const TableReports: React.FC<IReports> = (props) => {
  const { reports } = props;

  return (
    <table className="reports">
      <thead>
        <tr>
          {TABLE_REPORT_CAPTIONS.map((caption, index) => (
            <th key={index}>{caption}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {reports.map((report, index) => (
          <tr key={index}>
            <td>{pick(report, 'targetolog').targetolog}</td>
            <td>{pick(report.metrics, 'conversions').conversions}</td>
            <td>{pick(report.metrics, 'cpi').cpi}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { TableReports };
