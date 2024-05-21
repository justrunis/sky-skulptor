import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorContainer from "../UI/ErrorContainer";
import { fetchWeatherForEachHour } from "../../api/http";
import constants from "../../constants/constants";
import HoursWeatherCard from "./HoursWeatherCard";

export default function TodaysWeatherDisplayContainer({ city }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weather", { location: city }],
    queryFn: () => fetchWeatherForEachHour({ location: city }),
    staleTime: constants.STALE_TIME,
  });

  let hoursDisplayed = 0; // Declare hoursDisplayed variable here

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 bg-primary text-neutral-content rounded-lg mt-8 text-white p-8"
    >
      {!isLoading && !data?.forecast && (
        <ErrorContainer
          title="No data"
          error="No weather data found for the specified location."
        />
      )}
      {isLoading && <LoadingIndicator />}
      {isError && (
        <ErrorContainer
          title={"An error occurred while fetching weather data"}
          error={error}
        />
      )}
      {data?.forecast && !isError && (
        <>
          <p className="text-lg mb-6">
            Weather information for {city}, {data.location.country} for the next
            24 hours.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 2xl:grid-cols-6">
            {data.forecast.forecastday.map((day, index) => {
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
              return day.hour.map((hour) => (
                <HoursWeatherCard key={hour.time} hour={hour} />
              ));
            })}
          </div>
        </>
      )}
    </motion.div>
  );
}
