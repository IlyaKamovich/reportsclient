import React from 'react';
import { IReport } from 'components/Chart/models';
import { TABLE_REPORT_CAPTIONS } from './constants';

interface Props {
  reports: Array<IReport>;
}

const TableHeader: React.FC<Props> = (props) => {
  const { reports } = props;

  return (
    <thead>
      <tr>
        <th className="reports__header-date">{reports[0].formattedDate}</th>
        {TABLE_REPORT_CAPTIONS.map((item, index) => (
          <th key={index}>{item.key}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
