import { DatePickerVariables, IDatePickerViews } from './models';

class DataPickerHelpers {
  static renderDatePickerViews = (dateFormat: DatePickerVariables): IDatePickerViews[] => {
    switch (dateFormat) {
      case DatePickerVariables.byDay:
        return ['year', 'month', 'date'];
      case DatePickerVariables.byMonth:
        return ['year', 'month'];
    }
  };
}

export { DataPickerHelpers };
