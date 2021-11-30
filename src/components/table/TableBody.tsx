import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import { IReport } from 'components/Chart/models';

interface Props {
  reports: Array<IReport>;
}

const useStyles = makeStyles(() => ({
  tableRow: {
    '&:nth-child(even)': {
      backgroundColor: '#f2f2f2',
    },
  },
}));

const Body: React.FC<Props> = (props) => {
  const { reports } = props;
  const classes = useStyles();

  return (
    <TableBody>
      {reports.map(({ targetologName, metrics }, index) => {
        const { conversions, cpi } = metrics;

        return (
          <TableRow className={classes.tableRow} key={index}>
            <TableCell>{targetologName}</TableCell>
            <TableCell>{conversions}</TableCell>
            <TableCell>{cpi}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default Body;
