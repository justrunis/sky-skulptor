import { LineChart } from "@mui/x-charts";

export default function LineChartComponent({
  data,
  label = "Temperature (°C)",
}) {
  const labels = data.map((hour) =>
    new Date(hour.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const temperatures = data.map((hour) => hour.temp_c);

  return (
    <LineChart
      width={600}
      height={400}
      series={[
        {
          data: temperatures,
          label: label,
        },
      ]}
      xAxis={[
        {
          data: labels,
          label: "Time",
        },
      ]}
      yAxis={[
        {
          label: "Temperature (°C)",
        },
      ]}
    />
  );
}
