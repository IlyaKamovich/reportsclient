import React from 'react';
import Table from '@material-ui/core/Table';
import { IReport } from 'components/Chart/models';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  reports: Array<IReport>;
}

const useStyles = makeStyles(() => ({
  reports: {
    borderCollapse: 'collapse',
    width: '100%',
  },
}));

const TableReports: React.FC<Props> = (props) => {
  const { reports } = props;
  const classes = useStyles();

  return (
    <Table className={classes.reports}>
      <TableHeader reports={reports} />
      <TableBody reports={reports} />
      <TableFooter reports={reports} />
    </Table>
  );
};

export default TableReports;
