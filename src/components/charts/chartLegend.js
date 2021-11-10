import { Legend } from "recharts";

const ChartLegend = ({ dataKey, trendline }) => {
  const legendData = (dataKey, trendline) => {
    let base = [{ id: dataKey, value: dataKey, type: "ciclre", color: "#c0392b" }];

    if (trendline) {
      base.push({ id: "trendline", value: "trendline", type: "line", color: "#e74c3c" });
    }

    return base;
  };

  return <Legend verticalAlign="top" height={36} payload={legendData(dataKey, trendline)} />;
};

export { ChartLegend };
