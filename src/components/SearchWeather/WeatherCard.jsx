import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WeatherDetail from "./WeatherDetail";

export default function WeatherCard({ day, delay = 0 }) {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <motion.div
      key={day.date}
      className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-110"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <h2 className="text-xl font-bold mb-2 text-center">{day.date}</h2>
      <div className="flex justify-center items-center gap-2">
        <p className="text-lg mb-2">
          <img src={day.day.condition.icon} alt={day.day.condition.text} />
        </p>
        <WeatherDetail
          className="text-lg mb-2"
          label="Avg Temp"
          value={day.day.avgtemp_c}
          needsTemperatureUnit={true}
        />
      </div>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => setDetailsVisible(!detailsVisible)}
        aria-expanded={detailsVisible}
        aria-controls="details"
      >
        {detailsVisible ? "Hide Details" : "Show Details"}
      </button>
      <AnimatePresence>
        {detailsVisible && (
          <motion.div
            className="flex flex-col gap-2 mt-4"
            id="details"
            data-twe-collapse-item
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              staggerChildren: 1,
            }}
          >
            {/* Max Temp */}
            <WeatherDetail
              className="text-lg mb-2"
              label="Max Temp"
              value={day.day.maxtemp_c}
              needsTemperatureUnit={true}
            />

            {/* Min Temp */}
            <WeatherDetail
              className="text-lg mb-2"
              label="Min Temp"
              value={day.day.mintemp_c}
              needsTemperatureUnit={true}
            />

            {/* Average Wind speed */}
            <WeatherDetail
              className="text-lg mb-2"
              label="Avg Wind speed"
              value={day.day.avgvis_km}
              needsSpeedUnit={true}
            />

            {/* Rain chance */}
            <WeatherDetail
              className="text-lg mb-2"
              label="Rain chance"
              value={day.day.daily_chance_of_rain}
              needsPercentage={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
