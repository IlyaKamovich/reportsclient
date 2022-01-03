import { DatePickerVariables, DatePickerView } from './models';
class DatePickerHelpers {
  static renderDatePickerViews = (dateFormat: DatePickerVariables): DatePickerView[] => {
    switch (dateFormat) {
      case DatePickerVariables.byDay:
        return ['year', 'month', 'day'];
      case DatePickerVariables.byMonth:
        return ['year', 'month'];
    }
  };
}

export { DatePickerHelpers };
