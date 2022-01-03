const calculateTrendline = (values_y: number[]): number[] => {
  const values_x = Array.from({ length: values_y.length }, (_, i) => i + 1);

  let sum_x = 0;
  let sum_y = 0;
  let sum_xy = 0;
  let sum_xx = 0;
  let count = 0;

  let x = 0;
  let y = 0;

  values_x.forEach((_, index) => {
    x = values_x[index];
    y = values_y[index];
    sum_x += x;
    sum_y += y;
    sum_xx += x * x;
    sum_xy += x * y;
    count++;
  });

  const m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
  const b = sum_y / count - (m * sum_x) / count;

  const trendlineData = values_x.map((_, index) => {
    x = values_x[index];
    return x * m + b;
  });

  return trendlineData;
};

export { calculateTrendline };
