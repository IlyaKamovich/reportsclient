import React, { useState } from 'react';
import { useReports } from 'components/Chart/useReports';
import TableReports from './TableReport';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

const Container: React.FC = () => {
  const [startWith] = useState('2021-11-17T00:00:00.000+00:00');
  const [endOn] = useState('2021-11-18T00:00:00.000+00:00');
  const { reports, loading, error, errorMessage } = useReports('http://localhost:5000/reports/sourse', startWith, endOn);

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
    <TableContainer component={Paper}>
      <TableReports reports={reports} />
    </TableContainer>
  );
};

export default Container;
