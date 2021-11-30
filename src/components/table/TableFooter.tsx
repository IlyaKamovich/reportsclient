import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import { IReport } from 'components/Chart/models';

interface Props {
  reports: Array<IReport>;
}

const useStyles = makeStyles(() => ({
  footerRow: {
    background: '#7bed9f',
  },
  footerCell: {
    fontWeight: 700,
    fontSize: '24px',
    color: '#000',
  },
}));

const Footer: React.FC<Props> = (props) => {
  const { reports } = props;
  const classes = useStyles();

  const sumOfConversions = reports.reduce((acc: number, current: IReport) => acc + current.metrics.conversions, 0);
  const sumOfCpl = reports.reduce((acc: number, current: IReport) => acc + current.metrics.cpi, 0);

  return (
    <TableFooter>
      <TableRow className={classes.footerRow}>
        <TableCell className={classes.footerCell}>Итого:</TableCell>
        <TableCell className={classes.footerCell}>{sumOfConversions}</TableCell>
        <TableCell className={classes.footerCell}>{sumOfCpl}</TableCell>
      </TableRow>
    </TableFooter>
  );
};

export default Footer;
