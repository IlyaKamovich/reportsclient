import React from 'react';
import { ReportsTableHelpers } from '../ReportsTable/helpers';
import { IPayloadTooltip, ITableFormat } from './models';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  active?: boolean;
  payload?: IPayloadTooltip[];
}

const useStyles = makeStyles(() => ({
  tooltip: {
    backgroundColor: '#182c61',
    borderRadius: '5px',
    minWidth: '320px',
  },
  tooltipHeader: {
    borderBottom: '1px solid #fff',
    padding: '5px 0',
  },
  headerTitle: {
    color: '#fff',
    paddingLeft: '5px',
    fontSize: '24px',
  },
  tooltipBody: {
    padding: '5px 0',
  },
  tootipContent: {
    color: '#fff',
    paddingLeft: '5px',
    fontSize: '21px',
    fontWeight: 500,
  },
}));

const CustomTooltip: React.FC<Props> = ({ active, payload }) => {
  const classes = useStyles();

  if (!active || !payload) {
    return null;
  }

  return (
    <div className={classes.tooltip}>
      <div className={classes.tooltipHeader}>
        <h2 className={classes.headerTitle}>Дата - {ReportsTableHelpers.renderDateByFormat(new Date(), ITableFormat.daily)}</h2>
      </div>
      {payload.map((i: IPayloadTooltip) => (
        <div className={classes.tooltipBody} key={i.dataKey}>
          <p className={classes.tootipContent}>
            {`${i.name}:`} <span>{i.value} $</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export { CustomTooltip };
