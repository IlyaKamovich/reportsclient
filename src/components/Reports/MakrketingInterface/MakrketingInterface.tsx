import React from 'react';
import { IMarketingInterface } from './models';
import { useReports } from './useReports';
import { ITableFormat, MetricsKeys } from 'components/Reports/MakrketingInterface/GroupedReportsChart/models';
import { GroupedChartContainer } from './GroupedReportsChart';
import { Spinner } from 'components/Common/Spinner';
import { ReportsTable } from './ReportsTable';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  statisticsBy: IMarketingInterface;
}

const useStyles = makeStyles(() => ({
  error: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperBoxTables: {
    height: '100%',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
  },
  wrapperBoxCharts: {
    height: '100%',
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const MarketingInterface: React.FC<Props> = ({ statisticsBy }) => {
  const classes = useStyles();
  const { loading, error, errorMessage, reports } = useReports('http://localhost:5000/reports/sourse');

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className={classes.error}>
        <h1>{errorMessage}</h1>
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperBoxTables}>
        <ReportsTable reports={reports} tableFormat={ITableFormat.daily} statisticsBy={statisticsBy} />
        <ReportsTable reports={reports} tableFormat={ITableFormat.growing} statisticsBy={statisticsBy} />
      </div>
      <div className={classes.wrapperBoxCharts}>
        <GroupedChartContainer reports={reports} dataKey={MetricsKeys.CONVERSIONS} statisticsBy={statisticsBy} title="Конверсии" />
        <GroupedChartContainer reports={reports} dataKey={MetricsKeys.CPI} statisticsBy={statisticsBy} title="Цпл" />
      </div>
    </div>
  );
};

export { MarketingInterface };
