class Helpers {
  static isToday = () => {
    const today = new Date().toISOString().slice(0, 10);
    return today;
  };

  static getDataToday = (data) => {
    return Array.isArray(data) && data.filter((report) => report.date.slice(0, 10) === this.isToday());
  };
}

export { Helpers };
