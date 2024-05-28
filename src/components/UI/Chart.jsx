import React from "react";
import { LineChart } from "@mui/x-charts";

export default function Chart({ data, label, color, xAxisLabels }) {
  return (
    <LineChart
      height={300}
      grid={{ vertical: true, horizontal: true }}
      series={[
        {
          data: data.map((item) => item.y),
          label,
          color,
        },
      ]}
      xAxis={[
        {
          data: xAxisLabels,
          label: "Time (24h)",
          scaleType: "point",
          tickInterval: (time) =>
            parseInt(time.split(":")[0]) % 3 === 0 ? 1 : 0,
          classes: {
            tickLabels: "text-sm",
          },
        },
      ]}
      yAxis={[
        {
          label,
        },
      ]}
    />
  );
}
