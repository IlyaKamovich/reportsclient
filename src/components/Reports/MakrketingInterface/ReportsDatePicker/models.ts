export interface IDatePickerOptions {
  popover: {
    anchorOrigin: {
      vertical: 'top' | 'center' | 'bottom' | number;
      horizontal: 'left' | 'center' | 'right' | number;
    };
  };
  datePicker: {
    orientation: 'portrait' | 'landscape';
    variant: 'dialog' | 'inline' | 'static';
    minDate: string;
    maxDate: Date;
  };
}

export type IDatePickerViews = 'year' | 'date' | 'month';

export enum DatePickerVariables {
  byDay = 'byDay',
  byMonth = 'byMonth',
}
