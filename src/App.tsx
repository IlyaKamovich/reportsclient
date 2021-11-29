import React from 'react';
import { SourceKeys, MetricsKeys } from 'components/Chart/models';
import ChartContainer from 'components/Chart/ChartContainer';
import TableContainer from 'components/Table/TableContainer';
import './styles/index.css';

const marketingCharts = [
  { source: SourceKeys.FB, dataKey: MetricsKeys.CONVERSIONS, title: 'График конверсии' },
  { source: SourceKeys.FB, dataKey: MetricsKeys.CPI, title: 'График ЦПЛ' },
  { source: SourceKeys.TT, dataKey: MetricsKeys.CONVERSIONS, title: 'График конверсии' },
  { source: SourceKeys.TT, dataKey: MetricsKeys.CPI, title: 'График ЦПЛ' },
];

const App: React.FC = () => {
  return (
    <div className="App">
      <TableContainer />
      <div className="charts">
        {marketingCharts.map((item, index) => (
          <ChartContainer {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default App;
