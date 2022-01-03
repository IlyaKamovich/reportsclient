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
    minDate: Date;
    maxDate: Date;
  };
}

export declare type DatePickerView = 'year' | 'day' | 'month';

export enum DatePickerVariables {
  byDay = 'byDay',
  byMonth = 'byMonth',
}
