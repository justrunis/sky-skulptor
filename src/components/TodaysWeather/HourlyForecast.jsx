import { LineChart } from "@mui/x-charts";
import Chart from "../UI/Chart";
import { processData, sortAndCombineData } from "../../api/dataUtils";

export default function HourlyForecast({ forecast }) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const { todayData, tomorrowData } = processData(forecast, currentHour);

  const combinedData = sortAndCombineData(todayData, tomorrowData, currentHour);

  const allTemperatures = combinedData.map((item) => ({
    x: item.x,
    y: item.temp,
  }));

  const allRainPossibility = combinedData.map((item) => ({
    x: item.x,
    y: item.rain,
  }));

  const allCloudCover = combinedData.map((item) => ({
    x: item.x,
    y: item.cloud,
  }));

  const allWindSpeed = combinedData.map((item) => ({
    x: item.x,
    y: item.wind,
  }));

  const xAxisLabels = combinedData.map((item) => {
    const hour = item.x;
    return hour < 10 ? `0${hour}:00` : `${hour}:00`;
  });

  return (
    <div className="container mx-auto grid grid-cols-1 bg-secondary rounded-3xl xl:grid-cols-2 gap-4 mt-8 xl:p-12">
      {allTemperatures.length > 0 && (
        <Chart
          data={allTemperatures}
          label="Temperature (°C)"
          color="#FF5733"
          xAxisLabels={xAxisLabels}
        />
      )}
      {allRainPossibility.length > 0 && (
        <Chart
          data={allRainPossibility}
          label="Rain chance (%)"
          color="#3498DB"
          xAxisLabels={xAxisLabels}
        />
      )}
      {allWindSpeed.length > 0 && (
        <Chart
          data={allWindSpeed}
          label="Wind speed (km/h)"
          color="#8E44AD"
          xAxisLabels={xAxisLabels}
        />
      )}
      {allCloudCover.length > 0 && (
        <Chart
          data={allCloudCover}
          label="Cloud coverage (%)"
          color="#95A5A6"
          xAxisLabels={xAxisLabels}
        />
      )}
    </div>
  );
}
