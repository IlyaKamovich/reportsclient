import React from 'react';
import _pick from 'lodash/pick';
import _map from 'lodash/map';
import { TABLE_REPORT_CAPTIONS } from './constants';
import { IReports } from '../Chart/models';

import './tableReports.css';

const TableReports: React.FC<IReports> = (props) => {
  const { reports } = props;

  return (
    <table className="reports">
      <thead>
        <tr>
          {_map(TABLE_REPORT_CAPTIONS, ({ key }) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {_map(reports, ({ targetolog, metrics }, index) => {
          const { conversions, cpi } = _pick(metrics, ['conversions', 'cpi']);

          return (
            <tr key={index}>
              <td>{targetolog}</td>
              <td>{conversions}</td>
              <td>{cpi}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableReports;
