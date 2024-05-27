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
      <h2 className="text-xl font-bold mb-2 text-center">
        {day.day.condition.text}
      </h2>

      <div className="flex justify-center items-center m-2">
        <img
          className="mx-auto"
          src={day.day.condition.icon}
          alt={day.day.condition.text}
        />
        <p>
          {day.day.maxtemp_c}°C / {day.day.mintemp_c}°C
        </p>
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

            {/* Humidity */}
            <WeatherDetail
              className="text-lg mb-2"
              label="Humidity"
              value={day.day.avghumidity}
              needsPercentage={true}
            />

            {/* UV Index */}
            <WeatherDetail
              className="text-lg mb-2"
              label="UV Index"
              value={day.day.uv}
            />

            {/* Sunrise */}
            <WeatherDetail
              className="text-lg mb-2"
              label="Sunrise"
              value={day.astro.sunrise}
            />

            {/* Sunset */}
            <WeatherDetail
              className="text-lg mb-2"
              label="Sunset"
              value={day.astro.sunset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
