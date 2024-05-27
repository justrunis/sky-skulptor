import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorContainer from "../UI/ErrorContainer";
import { fetchWeatherForEachHour } from "../../api/http";
import constants from "../../constants/constants";
import HourlyForecast from "./HourlyForecast";
import { useState } from "react";
import LocalHourlyForecastCards from "../LocalWeather/LocalHourlyForecastCards";

export default function TodaysWeatherDisplayContainer({ city }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weather", { location: city }],
    queryFn: () => fetchWeatherForEachHour({ location: city }),
    staleTime: constants.STALE_TIME,
  });

  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 bg-primary text-neutral-content rounded-lg mt-8 text-white p-8 mb-5"
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
            {data.location.country} for the next 24 hours.
          </p>
          <HourlyForecast forecast={data.forecast} />
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
        </>
      )}
    </motion.div>
  );
}
