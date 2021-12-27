import React, { useMemo, useState } from 'react';
import { IReport, MetricsKeys, ISelectOption } from './models';
import ReactSelect, { PropsValue } from 'react-select';
import { useSelectOptions } from './useSelectOptions';
import { makeStyles } from '@material-ui/core/styles';
import { IMarketingInterface } from '../models';
import { GroupedChartHelpers } from './helpers';
import GroupedChart from './GroupedChart';
import FilterOption from './FilterOption';

interface Props {
  reports: IReport[];
  dataKey: MetricsKeys;
  title: string;
  statisticsBy: IMarketingInterface;
}

const useStyles = makeStyles(() => ({
  chartContainer: {
    height: '49.9%',
    width: '100%',
    position: 'relative',
  },
  chartContainerHeader: {
    zIndex: 100,
    position: 'absolute',
    height: '80px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    paddingLeft: '85px',
    color: ' #000',
    fontWeight: 800,
    fontSize: '30px',
  },
  select: {
    width: '290px',
    paddingRight: '25px',
  },
}));

const GroupedChartContainer: React.FC<Props> = ({ reports, dataKey, title, statisticsBy }) => {
  const classes = useStyles();

  const [optionSelected, setOptionSelected] = useState<PropsValue<ISelectOption>>([]);
  const handleChangeOptionValue = (selectedOption: PropsValue<ISelectOption>) => setOptionSelected(selectedOption);

  const chartData = useMemo(
    () => GroupedChartHelpers.getCurrentChartData(dataKey, reports, statisticsBy),
    [dataKey, reports, statisticsBy]
  );

  const selectOptions = useSelectOptions(reports, chartData, statisticsBy);

  return (
    <div className={classes.chartContainer}>
      <div className={classes.chartContainerHeader}>
        <h2 className={classes.headerTitle}>{title}</h2>
        <ReactSelect
          className={classes.select}
          placeholder="Select..."
          options={selectOptions}
          isMulti={true}
          closeMenuOnSelect={true}
          onChange={handleChangeOptionValue}
          value={optionSelected}
          components={{ Option: FilterOption }}
        />
      </div>
      <GroupedChart
        dataKey={dataKey}
        chartData={chartData}
        optionSelected={optionSelected}
        trendline={false}
        statisticsBy={statisticsBy}
        reports={reports}
      />
    </div>
  );
};

export { GroupedChartContainer };
