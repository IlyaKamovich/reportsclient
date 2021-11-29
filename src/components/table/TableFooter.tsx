import React from 'react';
import { IReport } from 'components/Chart/models';

interface Props {
  reports: Array<IReport>;
}

const TableFooter: React.FC<Props> = (props) => {
  const { reports } = props;

  const sumOfConversions = reports.reduce((acc: number, current: IReport) => acc + current.metrics.conversions, 0);
  const sumOfCpl = reports.reduce((acc: number, current: IReport) => acc + current.metrics.cpi, 0);

  return (
    <tfoot>
      <tr className="reports__footer">
        <td>Итого:</td>
        <td>{sumOfConversions}</td>
        <td>{sumOfCpl}</td>
      </tr>
    </tfoot>
  );
};

export default TableFooter;
