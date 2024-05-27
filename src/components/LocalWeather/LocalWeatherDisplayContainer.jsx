import constants from "../../constants/constants";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "../../api/http";
import { motion } from "framer-motion";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LocalWeeksForecast from "./LocalWeeksForecast";
import LocalTodaysForecast from "./LocalTodaysForecast";

export default function LocalWeatherDisplayContainer({ userCoords }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "localWeather",
      { location: `${userCoords.latitude},${userCoords.longitude}`, days: 7 },
    ],
    queryFn: () =>
      fetchWeatherData({
        location: `${userCoords.latitude},${userCoords.longitude}`,
        days: 7,
      }),
    staleTime: constants.STALE_TIME,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 bg-primary text-neutral-content rounded-lg mt-8 text-white p-8"
    >
      <Tabs>
        <TabList
          classID="tab-list"
          className="flex flex-col gap-2 p-4 bg-base-100 rounded-lg m-2 justify-center sm:flex-row sm:justify-start items-center"
        >
          <Tab className="btn btn-accent">Weeks forecast</Tab>
          <Tab className="btn btn-accent">Todays forecast</Tab>
          {data?.location && (
            <Tab>
              <h1 className="text-3xl font-bold text-center text-accent p-4">
                {data.location.name}, {data.location.country}
              </h1>
            </Tab>
          )}
        </TabList>

        <TabPanel>
          <LocalWeeksForecast
            data={data}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />
        </TabPanel>
        <TabPanel>
          <LocalTodaysForecast
            data={data}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />
        </TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
    </motion.div>
  );
}
