import HoursWeatherCard from "../TodaysWeather/HoursWeatherCard";

export default function LocalHourlyForecastCards({ forecast }) {
  let hoursDisplayed = 0;

  return (
    <div className="grid grid-cols-1 gap-1">
      {forecast.forecastday.map((day, index) => {
        if (index === 0) {
          const currentTime = new Date();
          const currentHour = currentTime.getHours();
          const currentMinutes = currentTime.getMinutes();
          const nextDay = new Date(currentTime);
          nextDay.setDate(nextDay.getDate() + 1);
          nextDay.setHours(currentHour);
          nextDay.setMinutes(currentMinutes);
          const endTime = nextDay.getTime();
          return day.hour.map((hour) => {
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
          });
        } else if (index === 1) {
          const currentTime = new Date();
          const oneDayAhead = new Date(currentTime);
          oneDayAhead.setDate(oneDayAhead.getDate() + 1);
          const endTime = oneDayAhead.getTime();
          return day.hour.map((hour) => {
            const hourTime = new Date(hour.time).getTime();
            if (hourTime <= endTime) {
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
          });
        }
      })}
    </div>
  );
}
