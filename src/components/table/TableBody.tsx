import React from 'react';
import { IReport } from 'components/Chart/models';

interface Props {
  reports: Array<IReport>;
}

const TableBody: React.FC<Props> = (props) => {
  const { reports } = props;

  return (
    <tbody>
      {reports.map(({ targetologName, metrics }, index) => {
        const { conversions, cpi } = metrics;

        return (
          <tr key={index}>
            <td>{targetologName}</td>
            <td>{conversions}</td>
            <td>{cpi}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
