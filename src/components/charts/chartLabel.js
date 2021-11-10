const ChartLabel = ({ x, y, value }) => {
  return (
    <text x={x} y={y} dy={-13} fill="#c0392b" fontSize={15} textAnchor="middle">
      {value}
    </text>
  );
};

export { ChartLabel };
