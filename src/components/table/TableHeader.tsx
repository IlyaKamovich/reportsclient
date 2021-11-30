import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import { IReport } from 'components/Chart/models';
import { TABLE_REPORT_CAPTIONS } from './constants';

interface Props {
  reports: Array<IReport>;
}

const useStyles = makeStyles(() => ({
  headerRow: {
    background: '#7bed9f',
  },
  headerCell: {
    fontWeight: 500,
    fontSize: '21px',
    cursor: 'pointer',
  },
}));

const TableHeader: React.FC<Props> = (props) => {
  const { reports } = props;
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow className={classes.headerRow}>
        <TableCell component="th" className={classes.headerCell}>
          {reports[0].formattedDate}
        </TableCell>
        {TABLE_REPORT_CAPTIONS.map((item, index) => (
          <TableCell component="th" className={classes.headerCell} key={index}>
            {item.key}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
