import { IReportsDataPickerOptions } from './models';

export const ReportsDataPickerOptinons: IReportsDataPickerOptions = {
  popover: {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
  },
  datePicker: {
    orientation: 'landscape',
    variant: 'static',
    minDate: '2019-03-01',
    maxDate: new Date(),
  },
};
