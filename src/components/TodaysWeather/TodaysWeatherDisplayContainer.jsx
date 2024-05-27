import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorContainer from "../UI/ErrorContainer";
import { fetchWeatherForEachHour } from "../../api/http";
import constants from "../../constants/constants";
import HoursWeatherCard from "./HoursWeatherCard";
import HourlyForecast from "./HourlyForecast";

export default function TodaysWeatherDisplayContainer({ city }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weather", { location: city }],
    queryFn: () => fetchWeatherForEachHour({ location: city }),
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
            Weather information for {data.location.name},{" "}
            {data.location.country} for the next 24 hours.
          </p>
          <HourlyForecast forecast={data.forecast} />
        </>
      )}
    </motion.div>
  );
}
