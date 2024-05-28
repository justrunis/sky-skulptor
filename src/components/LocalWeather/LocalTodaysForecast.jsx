import { motion } from "framer-motion";
import ErrorContainer from "../UI/ErrorContainer";
import LoadingIndicator from "../UI/LoadingIndicator";
import HourlyForecast from "../TodaysWeather/HourlyForecast";
import { useState } from "react";
import LocalHourlyForecastCards from "./LocalHourlyForecastCards";
import HoursWeatherCard from "../TodaysWeather/HoursWeatherCard";

export default function LocalTodaysForecast({
  data,
  isLoading,
  isError,
  error,
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 bg-primary text-neutral-content rounded-lg p-8"
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
          <h1 className="text-3xl font-bold text-center p-4 text-primary-content m-5">
            Current weather
          </h1>
          <HoursWeatherCard hour={data.current} delay={0.2} />
          <h2 className="text-2xl font-bold text-center p-4 text-primary-content m-5">
            Hourly Forecast graphs
          </h2>
          <HourlyForecast forecast={data.forecast} />
        </>
      )}
      <button
        className="btn btn-accent text-accent-content mt-5"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide" : "Show"} Details
      </button>
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="container flex flex-col bg-primary text-primary-content rounded-lg"
        >
          <h2 className="text-2xl font-bold text-center m-4">
            Hourly Forecast Details
          </h2>
          <LocalHourlyForecastCards forecast={data.forecast} />
        </motion.div>
      )}
    </motion.div>
  );
}
