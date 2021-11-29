import React, { useState } from 'react';
import { SourceKeys, MetricsKeys } from './models';
import { useReports } from './useReports';
import Chart from './Chart';

interface Props {
  source: SourceKeys;
  dataKey: MetricsKeys;
  title: string;
}

const ChartContainer: React.FC<Props> = (props) => {
  const { source, dataKey, title } = props;

  const [startWith] = useState('2021-11-17T00:00:00.000+00:00');
  const [endOn] = useState('2021-11-21T00:00:00.000+00:00');
  const { reports, loading, error, errorMessage } = useReports('http://localhost:5000/reports/sourse', startWith, endOn, source);

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
    <div className="chart">
      <h2>{title + ' ' + source}</h2>
      <Chart reports={reports} dataKey={dataKey} trendline={false} />
    </div>
  );
};

export default ChartContainer;
