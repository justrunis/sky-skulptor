import HoursWeatherCard from "../TodaysWeather/HoursWeatherCard";
import { Fragment } from "react";

export default function LocalHourlyForecastCards({ forecast }) {
  let hoursDisplayed = 0;

  function formatTime(time) {
    const date = new Date(time);
    return date.toLocaleDateString("en-UK", {
      day: "numeric",
      month: "short",
    });
  }

  return (
    <div className="grid grid-cols-1 gap-1">
      {/* Mapping over each forecast day */}
      {forecast.forecastday.map((day, index) => {
        if (index >= 2) {
          return null;
        }
        // Determining the end time for the current day's forecast
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        const nextDay = new Date(currentTime);
        nextDay.setDate(nextDay.getDate() + index + 1);
        nextDay.setHours(currentHour);
        nextDay.setMinutes(currentMinutes);
        const endTime = nextDay.getTime();

        return (
          <Fragment key={day.date}>
            <div className="grid grid-cols-8 gap-6 place-items-center p-4 text-black uppercase text-3xl">
              <h1>{formatTime(day.date)}</h1>
            </div>
            {day.hour.map((hour) => {
              const hourTime = new Date(hour.time).getTime();
              if (
                hourTime >= currentTime &&
                hourTime <= endTime &&
                hoursDisplayed < 24
              ) {
                hoursDisplayed++;
                return (
                  <HoursWeatherCard
                    key={hour.time}
                    hour={hour}
                    delay={hoursDisplayed * 0.1}
                  />
                );
              }
              return null;
            })}
          </Fragment>
        );
      })}
    </div>
  );
}
