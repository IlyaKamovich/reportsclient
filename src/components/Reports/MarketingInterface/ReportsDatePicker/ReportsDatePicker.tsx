import React, { useMemo } from 'react';
import Popover from '@mui/material/Popover';
import { DATE_PICKER_OPTIONS } from './constants';
import { DatePickerVariables } from './models';
import { DatePickerHelpers } from './helpers';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

interface Props {
  id: string;
  open: boolean;
  value: Date;
  dateFormat: DatePickerVariables;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  onChange: (date: Date | null) => void;
}

const ReportsDatePicker: React.FC<Props> = ({ id, open, anchorEl, onClose, value, onChange, dateFormat }) => {
  const { popover, datePicker } = DATE_PICKER_OPTIONS;
  const datePickerViews = useMemo(() => DatePickerHelpers.renderDatePickerViews(dateFormat), []);

  return (
    <Popover id={id} open={open} anchorEl={anchorEl} onClose={onClose} anchorOrigin={popover.anchorOrigin}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={datePickerViews}
          minDate={datePicker.minDate}
          maxDate={datePicker.maxDate}
          value={value}
          onChange={onChange}
          renderInput={(params: any) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
    </Popover>
  );
};

export { ReportsDatePicker };
