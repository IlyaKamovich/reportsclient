import { Header, TableReports, ChartContainer } from "./components";
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
        <ChartContainer reports={reports} dataKey="cpi" title="График ЦПА" trendline />
        <ChartContainer reports={reports} dataKey="conversions" title="График конверсии" trendline />
      </div>
    </div>
  );
}

export default App;
