import React from 'react';
import { useReports } from './components/Chart/useReports';
import { MetricsKeys } from './components/Chart/constants';
import Header from 'components/Header/Header';
import TableReports from 'components/Table/TableReport';
import Chart from 'components/Chart/Chart';

import './styles/index.css';

const marketingCharts = [
  {
    title: 'График ЦПА',
    chartColor: '#c0392b',
    trendlineColor: '#e74c3c',
    dataKey: MetricsKeys.CPI,
    trendline: true,
  },
  {
    title: 'График конверсии',
    chartColor: '#c0392b',
    trendlineColor: '#e74c3c',
    dataKey: MetricsKeys.CONVERSIONS,
    trendline: true,
  },
];

const App: React.FC = () => {
  const { reports, loading, error, errorMessage } = useReports('https://reportstarget.herokuapp.com/reports');

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h1>{errorMessage}</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <Header title="Reports" />
      <TableReports reports={reports} />
      <div className="charts">
        {marketingCharts.map((props) => (
          <Chart {...props} key={props.dataKey} reports={reports} />
        ))}
      </div>
    </div>
  );
};

export default App;
