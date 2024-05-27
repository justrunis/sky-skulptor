import { motion } from "framer-motion";
import ErrorContainer from "../UI/ErrorContainer";
import LoadingIndicator from "../UI/LoadingIndicator";
import HourlyForecast from "../TodaysWeather/HourlyForecast";
import { useState } from "react";
import LocalHourlyForecastCards from "./LocalHourlyForecastCards";

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
        <HourlyForecast forecast={data.forecast} />
      )}
      <button
        className="btn btn-accent mt-5"
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
          className="container flex flex-col bg-primary text-neutral-content rounded-lg text-white"
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
