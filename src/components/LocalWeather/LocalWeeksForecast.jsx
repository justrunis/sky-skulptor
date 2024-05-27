import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorContainer from "../UI/ErrorContainer";
import { motion } from "framer-motion";
import WeatherCard from "../UI/WeatherCard";

export default function LocalWeeksForecast({
  data,
  isLoading,
  isError,
  error,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 bg-primary text-neutral-content rounded-lg text-white p-8"
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
            Weather information for {data.location.name},{" "}
            {data.location.country} for the next 7 days.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 2xl:grid-cols-4">
            {data.forecast.forecastday.map((day, index) => (
              <WeatherCard day={day} key={day.date} delay={index * 0.2} />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
