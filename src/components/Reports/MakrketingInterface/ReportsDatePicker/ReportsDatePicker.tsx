import React, { useMemo } from 'react';
import Popover from '@material-ui/core/Popover';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DATE_PICKER_OPTIONS } from './constants';
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

const ReportsDatePicker: React.FC<Props> = ({ id, open, anchorEl, onClose, value, onChange, dateFormat }) => {
  const { popover, datePicker } = DATE_PICKER_OPTIONS;
  const datePickerViews = useMemo(() => DataPickerHelpers.renderDatePickerViews(dateFormat), []);

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
          views={datePickerViews}
        />
      </MuiPickersUtilsProvider>
    </Popover>
  );
};

export { ReportsDatePicker };
