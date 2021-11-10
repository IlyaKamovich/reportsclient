import { Header, TableReports, CpiChart, ConversionChart } from "./components";
import { METRICS_KEYS } from "./constants";
import { useReports } from "./hooks";

function App() {
  const [reports, loading] = useReports("https://reportstarget.herokuapp.com/reports");

  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <Header title="Reports" />
      <TableReports reports={reports} />
      <div className="charts">
        <CpiChart title="График ЦПА" dataKey={METRICS_KEYS.CPI} reports={reports} trendline />
        <ConversionChart title="График конверсии" dataKey={METRICS_KEYS.CONVERSIONS} reports={reports} trendline />
      </div>
    </div>
  );
}

export default App;
