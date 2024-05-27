import React from "react";
import { LineChart } from "@mui/x-charts";
import HoursWeatherCard from "./HoursWeatherCard";

export default function HourlyForecast({ forecast }) {
  let todayTemperatures = {};
  let tomorrowTemperatures = {};

  // Collect temperature data for today and tomorrow
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  forecast.forecastday.forEach((day) => {
    day.hour.forEach((hour) => {
      const hourTime = new Date(hour.time).getHours();

      if (hourTime >= currentHour) {
        if (!todayTemperatures[hourTime]) {
          todayTemperatures[hourTime] = [];
        }
        todayTemperatures[hourTime].push(hour.temp_c);
      } else {
        if (!tomorrowTemperatures[hourTime]) {
          tomorrowTemperatures[hourTime] = [];
        }
        tomorrowTemperatures[hourTime].push(hour.temp_c);
      }
    });
  });

  // Calculate average temperature for each hour for today and tomorrow
  const todayAverageTemperatures = Object.keys(todayTemperatures).map(
    (hour) => ({
      x: parseInt(hour),
      y:
        todayTemperatures[hour].reduce((acc, val) => acc + val, 0) /
        todayTemperatures[hour].length,
    })
  );

  const tomorrowAverageTemperatures = Object.keys(tomorrowTemperatures).map(
    (hour) => ({
      x: parseInt(hour),
      y:
        tomorrowTemperatures[hour].reduce((acc, val) => acc + val, 0) /
        tomorrowTemperatures[hour].length,
    })
  );

  // Sort temperature data by time
  todayAverageTemperatures.sort((a, b) => a.x - b.x);
  tomorrowAverageTemperatures.sort((a, b) => a.x - b.x);

  return (
    <div className="flex flex-col lg:flex-row">
      <div>
        <h2 className="text-xl font-bold mb-2 text-center">Today</h2>
        {todayAverageTemperatures.length > 0 && (
          <LineChart
            width={400}
            height={300}
            series={[
              {
                data: todayAverageTemperatures.map((temp) => temp.y),
                label: "Temperature (°C)",
                id: "today",
              },
            ]}
            xAxis={[
              {
                data: todayAverageTemperatures.map((temp) => temp.x.toString()),
                label: "Time (24h)",
              },
            ]}
            yAxis={[
              {
                label: "Temperature (°C)",
              },
            ]}
            customSeriesColors="#007bff"
          />
        )}
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2 text-center">Tomorrow</h2>
        {tomorrowAverageTemperatures.length > 0 && (
          <LineChart
            width={400}
            height={300}
            series={[
              {
                data: tomorrowAverageTemperatures.map((temp) => temp.y),
                label: "Temperature (°C)",
                id: "tomorrow",
              },
            ]}
            xAxis={[
              {
                data: tomorrowAverageTemperatures.map((temp) =>
                  temp.x.toString()
                ),
                label: "Time (24h)",
              },
            ]}
            yAxis={[
              {
                label: "Temperature (°C)",
              },
            ]}
            customSeriesColors="#28a745"
            tooltip={true}
          />
        )}
      </div>
    </div>
  );
}
