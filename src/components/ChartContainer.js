import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from "recharts";
import { ChartHelpers } from "../utils/charts";

const ChartContainer = ({ reports, dataKey, trendline, title }) => {
  const [currentReports, setCurrentReports] = useState([]);

  useEffect(() => {
    switch (dataKey) {
      case "cpi":
        setCurrentReports(getReportsByKey(dataKey));
        break;
      case "conversions":
        setCurrentReports(getReportsByKey(dataKey));
        break;
      default:
        setCurrentReports([]);
    }
  }, []);

  const calculateTrendline = (reportsByKey) => {
    const x = Array.from({ length: reportsByKey.length }, (_, i) => i + 1);
    const y = reportsByKey.map((item) => item[dataKey]);

    const res = ChartHelpers.MathTrendline(x, y);

    const reportWithTrendline = reportsByKey.map((item, index) => {
      return { ...item, trendline: res[1][index] };
    });

    return reportWithTrendline;
  };

  const getReportsByKey = (key) => {
    const reportsByKey = reports.map((report) => {
      return {
        targetolog: report.targetolog,
        [key]: report.metrics[key],
      };
    });

    if (trendline) {
      const reportWithTrendline = calculateTrendline(reportsByKey);
      return reportWithTrendline;
    }

    return reportsByKey;
  };

  const CustomLabel = ({ x, y, value }) => {
    return (
      <text x={x} y={y} dy={-11} fill="#82ca9d" fontSize={15} textAnchor="middle">
        {value}
      </text>
    );
  };

  const legendData = (key, trendline) => {
    let base = [{ id: key, value: key, type: "c", color: "#82ca9d" }];

    if (trendline) {
      base.push({ id: "trendline", value: "trendline", type: "line", color: "#000" });
    }

    return base;
  };

  const calculateDataMax = (maxValue) => {
    switch (dataKey) {
      case "cpi":
        return maxValue + 0.3;
        break;
      case "conversions":
        return maxValue + 7;
        break;
      default:
        return maxValue;
    }
  };

  const calculateDataMin = (minValue) => {
    switch (dataKey) {
      case "cpi":
        return minValue - 0.15;
        break;
      case "conversions":
        return minValue - 5;
        break;
      default:
        return minValue;
    }
  };

  return (
    <div className="chart">
      <h2>{title}</h2>
      <LineChart width={950} height={440} data={currentReports} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
        <Line type="monotone" dataKey={dataKey} stroke="#82ca9d" label={<CustomLabel />} dot={{ stroke: "#82ca9d", strokeWidth: 5 }} />
        {trendline && <Line dataKey="trendline" stroke="#000" />}

        <XAxis dataKey="targetolog" padding={{ left: 15, right: 15 }}>
          <LabelList dataKey="targetolog" position="top" />
        </XAxis>

        <YAxis
          dataKey={dataKey.toString()}
          label={{ angle: -90, position: "insideLeft", textAnchor: "middle" }}
          domain={[(dataMin) => calculateDataMin(dataMin), (dataMax) => calculateDataMax(dataMax)]}
        />

        <Tooltip />
        <Legend verticalAlign="top" height={36} payload={legendData(dataKey, trendline)} />
        <CartesianGrid vertical={false} />
      </LineChart>
    </div>
  );
};

ChartContainer.defaultProps = {
  title: "График",
};

export { ChartContainer };
