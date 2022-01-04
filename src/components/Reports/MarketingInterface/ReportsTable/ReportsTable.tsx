import React, { useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import { IReport, TableFormat } from '../GroupedReportsChart/models';
import { MarketingReportViews } from '../models';
import { ReportsTableHelpers } from './helpers';
import { IMetricsBySource, IMetricsByTargetolog } from './models';

interface Props {
  reports: IReport[];
  tableFormat: TableFormat;
  statisticsBy: MarketingReportViews;
}

const useStyles = makeStyles({
  reports: {
    borderCollapse: 'collapse',
    width: '100%',
    height: '100% ',
    margin: 'auto ',
  },
  reportsRow: {
    backgroundColor: '#182c61',
  },
  reportsCell: {
    color: 'white !important',
    fontFamily: "'Montserrat', sans-serif !important",
    paddingTop: '12px !important',
    paddingBottom: '12px !important',
    fontSize: '1.7rem !important',
    fontWeight: '600 !important',
    border: '2px solid #ddd !important',
    padding: '15px !important',
    width: '30% !important',
    '&:first-child': {
      width: '40% !important',
    },
  },
  reportsBodyRow: {
    backgroundColor: '#46588a',
  },
  wrappeBoxTableContainer: {
    height: '50%',
    width: '100%',
  },
});

const ReportsTable: React.FC<Props> = ({ reports, tableFormat, statisticsBy }) => {
  const classes = useStyles();

  const calculatedReports = useMemo(() => {
    const sumOfMetricsByTableFormat = ReportsTableHelpers.calculateSumOfMetricsByTableFormat(reports, tableFormat, statisticsBy);

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
          {calculatedReports.sumOfMetricsByTableFormat.map((report: IMetricsBySource | IMetricsByTargetolog) => {
            const keyName =
              statisticsBy === MarketingReportViews.bySources
                ? (report as IMetricsBySource).source
                : (report as IMetricsByTargetolog).targetologName;
            return (
              <TableRow className={classes.reportsBodyRow} key={keyName}>
                <TableCell className={classes.reportsCell} component="td">
                  {keyName}
                </TableCell>
                <TableCell className={classes.reportsCell} component="td">
                  {report.conversions}
                </TableCell>
                <TableCell className={classes.reportsCell} component="td">
                  {report.cpl}
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