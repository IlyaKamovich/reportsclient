import { DatePickerVariables, IDatePickerViews } from './models';

class DataPickerHelpers {
  static renderDatePickerViews = (dateFormat: DatePickerVariables): IDatePickerViews[] => {
    const defaultViews: IDatePickerViews[] = ['year', 'month', 'date'];
    const viewsByMonth: IDatePickerViews[] = ['year', 'month'];

    switch (dateFormat) {
      case DatePickerVariables.byDay:
        return defaultViews;
      case DatePickerVariables.byMonth:
        return viewsByMonth;
    }
  };
}

export { DataPickerHelpers };
