import React, { useMemo } from 'react';
import { IReport, MetricsKeys } from './models';
import { makeStyles } from '@mui/styles';
import { MarketingReportViews } from '../models';
import { GroupedChartHelpers } from './helpers';
import GroupedChart from './GroupedChart';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useSelectOptions } from './useSelectOptions';

interface Props {
  reports: IReport[];
  dataKey: MetricsKeys;
  title: string;
  statisticsBy: MarketingReportViews;
}

const useStyles = makeStyles({
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
    width: '350px',
    paddingTop: '35px',
    paddingRight: '45px',
    opacity: '0.4',
    '&:hover': {
      opacity: '1',
    },
  },
});

const GroupedChartContainer: React.FC<Props> = ({ reports, dataKey, title, statisticsBy }) => {
  const classes = useStyles();

  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const chartData = useMemo(
    () => GroupedChartHelpers.getCurrentChartData(dataKey, reports, statisticsBy),
    [dataKey, reports, statisticsBy]
  );

  const defaultSelectOptions: string[] = useSelectOptions(chartData);

  return (
    <div className={classes.chartContainer}>
      <div className={classes.chartContainerHeader}>
        <h2 className={classes.headerTitle}>{title}</h2>
        <Autocomplete
          disableCloseOnSelect
          disableListWrap={true}
          value={selectedOptions}
          onChange={(event: React.SyntheticEvent<Element, Event>, value: string[]) => setSelectedOptions(value)}
          className={classes.select}
          multiple
          autoHighlight
          options={defaultSelectOptions}
          getOptionLabel={(option: string) => GroupedChartHelpers.formatSelectOption(option, reports)}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                checked={selected}
              />
              {GroupedChartHelpers.formatSelectOption(option, reports)}
            </li>
          )}
          renderInput={(params) => <TextField {...params} label="Select chart keys" />}
        />
      </div>
      <GroupedChart
        dataKey={dataKey}
        chartData={chartData}
        selectedOptions={selectedOptions}
        trendline={false}
        statisticsBy={statisticsBy}
        reports={reports}
      />
    </div>
  );
};

export { GroupedChartContainer };
