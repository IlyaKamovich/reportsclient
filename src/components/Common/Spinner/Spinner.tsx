import React from 'react';
import { makeStyles } from '@mui/styles';
import spinner from '../../../assets/spinner.svg';

const useStyles = makeStyles({
  loading: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Spinner: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <img src={spinner} alt={spinner} />
    </div>
  );
};

export { Spinner };
