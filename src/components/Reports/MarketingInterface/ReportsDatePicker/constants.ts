import { IDatePickerOptions } from './models';

export const DATE_PICKER_OPTIONS: IDatePickerOptions = {
  popover: {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
  },
  datePicker: {
    orientation: 'landscape',
    variant: 'static',
    minDate: new Date('2019-03-01'),
    maxDate: new Date(),
  },
};
