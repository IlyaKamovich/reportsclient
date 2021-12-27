import React, { useMemo } from 'react';
import { ReportsTableHelpers } from './helpers';
import { IReport, ITableFormat } from 'components/Reports/MakrketingInterface/GroupedReportsChart/models';
import { IMarketingInterface } from '../models';
import { IMixedReportsResultByPediod } from './models';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  reports: IReport[];
  tableFormat: ITableFormat;
  statisticsBy: IMarketingInterface;
}

const useStyles = makeStyles(() => ({
  reports: {
    borderCollapse: 'collapse',
    width: '100%',
    height: '100%',
    margin: 'auto',
  },
  reportsRow: {
    backgroundColor: '#182c61',
  },
  reportsCell: {
    fontFamily: "'Montserrat', sans-serif",
    paddingTop: '12px',
    paddingBottom: '12px',
    textAlign: 'left',
    color: 'white',
    fontSize: '1.7rem',
    fontWeight: 600,
    border: '2px solid #ddd',
    padding: '15px',
    width: '30%',
    '&:first-child': {
      width: '40%',
    },
  },
  reportsBodyRow: {
    backgroundColor: '#46588a',
  },
  wrappeBoxTableContainer: {
    height: '50%',
    width: '100%',
  },
}));

const ReportsTable: React.FC<Props> = ({ reports, tableFormat, statisticsBy }) => {
  const classes = useStyles();

  const calculatedReports = useMemo(() => {
    const sumOfMetricsByTableFormat = ReportsTableHelpers.calculateSumOfMeticsByTableFormat(reports, tableFormat, statisticsBy);

    const sumOfConversions = ReportsTableHelpers.getSumOfConversions(sumOfMetricsByTableFormat);
    const avgCpl = ReportsTableHelpers.getAvgCpl(sumOfMetricsByTableFormat);

    return { sumOfMetricsByTableFormat, sumOfConversions, avgCpl };
  }, [reports]);

  const tableDate = useMemo(() => ReportsTableHelpers.renderDateByFormat(new Date(), tableFormat), [tableFormat]);

  return (
    <div className={classes.wrappeBoxTableContainer}>
      <Table className={classes.reports}>
        <TableHead>
          <TableRow className={classes.reportsRow}>
            <TableCell className={classes.reportsCell}>{tableDate}</TableCell>
            <TableCell className={classes.reportsCell}>Заявки</TableCell>
            <TableCell className={classes.reportsCell}>Цпл</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {calculatedReports.sumOfMetricsByTableFormat.map((report: IMixedReportsResultByPediod) => {
            const rowProp = statisticsBy === IMarketingInterface.bySources ? report.source : report.targetologName;
            return (
              <TableRow className={classes.reportsBodyRow} key={rowProp}>
                <TableCell className={classes.reportsCell} component="td">
                  {rowProp}
                </TableCell>
                <TableCell className={classes.reportsCell} component="td">
                  {report.conversions}
                </TableCell>
                <TableCell className={classes.reportsCell} component="td">
                  {report.cpi}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow className={classes.reportsRow}>
            <TableCell className={classes.reportsCell}>Всего</TableCell>
            <TableCell className={classes.reportsCell}>{calculatedReports.sumOfConversions}</TableCell>
            <TableCell className={classes.reportsCell}>{calculatedReports.avgCpl}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export { ReportsTable };
