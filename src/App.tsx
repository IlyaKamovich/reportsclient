import React from 'react';
import { TableReports, Header, Chart } from './components';
import { METRICS_KEYS } from './constants';
import { useReports } from './hooks';

const App: React.FC = () => {
  const [reports, loading, error, errorMessage] = useReports('https://reportstarget.herokuapp.com/reports');

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
        <Chart title="График ЦПА" dataKey={METRICS_KEYS.CPI} reports={reports} trendline />
        <Chart title="График конверсии" dataKey={METRICS_KEYS.CONVERSIONS} reports={reports} trendline />
      </div>
    </div>
  );
};

export default App;
