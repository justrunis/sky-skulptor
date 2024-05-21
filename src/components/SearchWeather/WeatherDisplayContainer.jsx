import { motion } from "framer-motion";
import { fetchWeatherData } from "../../api/http";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorContainer from "../UI/ErrorContainer";
import WeatherCard from "./WeatherCard";

import constants from "../../constants/constants";

export default function WeatherDisplayContainer({ city, days }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weather", { location: city, days }],
    queryFn: () => fetchWeatherData({ location: city, days }),
    staleTime: constants.STALE_TIME,
  });

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
            Weather information for {city}, {data.location.country} for the next{" "}
            {days} days.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {data.forecast.forecastday.map((day, index) => (
              <WeatherCard day={day} key={day.date} delay={index * 0.2} />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
