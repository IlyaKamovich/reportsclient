import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  links: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '120px',
    paddingLeft: '120px',
  },
  linksBtn: {
    padding: '10px 20px',
    backgroundColor: '#005083',
    textDecoration: 'none',
    marginBottom: '20px',
    color: '#fff',
    fontSize: '26px',
    textShadow: '1px 1px 2px rgb(0 0 0 / 50%)',
    borderRadius: '10px',
    maxWidth: '620px',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#006fb6',
    },
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.links}>
      <Link className={classes.linksBtn} to="marketing/sources">
        Маркетинг - показатели по источникам
      </Link>
      <Link className={classes.linksBtn} to="marketing/targetologs">
        Маркетинг - показатели по таргетологам
      </Link>
    </div>
  );
};

export { Home };
