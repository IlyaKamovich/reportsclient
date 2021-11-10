import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChartLabel } from "./chartLabel";
import { ChartLegend } from "./chartLegend";
import { conversionChartSettings as Config } from "../../config";
import { ChartHelper } from "../../helpers";

const ConversionChart = ({ title, dataKey, reports, trendline }) => {
  const [currentReports, _] = useState(ChartHelper.getReportsByKey(reports, dataKey, trendline));

  return (
    <div className="chart">
      <h2>{title}</h2>
      <LineChart width={950} height={440} data={currentReports}>
        <Line dataKey={dataKey} stroke="#c0392b" label={<ChartLabel />} dot={Config.dotSettings} />
        {trendline && <Line dataKey="trendline" stroke="#e74c3c" dot={null} />}

        <XAxis dataKey="targetolog" padding={Config.xAxisPadding} />

        <YAxis
          dataKey={dataKey.toString()}
          label={Config.yAxisLabel}
          domain={[(dataMin) => ChartHelper.calculateDataMin(dataMin), (dataMax) => ChartHelper.calculateDataMax(dataMax)]}
        />

        <Tooltip />
        <ChartLegend dataKey={dataKey} trendline={trendline} />
        <CartesianGrid vertical={false} />
      </LineChart>
    </div>
  );
};

export { ConversionChart };
