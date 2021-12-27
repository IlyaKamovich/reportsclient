import React from 'react';
import Popover from '@material-ui/core/Popover';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ReportsDataPickerOptinons } from './constants';
import { DatePickerVariables } from './models';
import { DataPickerHelpers } from './helpers';

interface Props {
  id: string;
  open: boolean;
  value: Date;
  dateFormat: DatePickerVariables;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  onChange: (date: MaterialUiPickersDate) => void;
}

const ReportsDataPicker: React.FC<Props> = (props) => {
  const { id, open, anchorEl, onClose, value, onChange, dateFormat } = props;
  const { popover, datePicker } = ReportsDataPickerOptinons;

  return (
    <Popover id={id} open={open} anchorEl={anchorEl} onClose={onClose} anchorOrigin={popover.anchorOrigin}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
        <DatePicker
          value={value}
          onChange={onChange}
          orientation={datePicker.orientation}
          variant={datePicker.variant}
          minDate={datePicker.minDate}
          maxDate={datePicker.maxDate}
          views={DataPickerHelpers.renderDatePickerViews(dateFormat)}
        />
      </MuiPickersUtilsProvider>
    </Popover>
  );
};

export { ReportsDataPicker };
