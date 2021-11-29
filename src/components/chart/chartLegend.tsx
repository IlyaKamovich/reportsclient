import React from 'react';
import { Legend } from 'recharts';
import { IPayload, IReport, MetricsKeys } from './models';

interface Props {
  dataKey?: MetricsKeys;
  trendline?: boolean;
  payload?: Array<IPayload>;
  reports: Array<IReport>;
}

const ChartLegend: React.FC<Props> = (props) => {
  const { payload, reports } = props;

  const modifyLegendPayload = () => {
    if (!payload) {
      return [];
    }

    const modifiedLegendPayload = payload.map((payloadData) => {
      const payloadValue = payloadData.value.split('.')[0];

      return {
        ...payloadData,
        value: reports.find((report) => report.targetologId === payloadValue)?.targetologName,
      };
    });

    return modifiedLegendPayload;
  };

  return <Legend payload={modifyLegendPayload()} />;
};

export default ChartLegend;
