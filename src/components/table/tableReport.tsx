import React from 'react';
import { IReport } from 'components/Chart/models';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import './tableReports.css';

interface Props {
  reports: Array<IReport>;
}

const TableReports: React.FC<Props> = (props) => {
  const { reports } = props;

  return (
    <table className="reports">
      <TableHeader reports={reports} />
      <TableBody reports={reports} />
      <TableFooter reports={reports} />
    </table>
  );
};

export default TableReports;
