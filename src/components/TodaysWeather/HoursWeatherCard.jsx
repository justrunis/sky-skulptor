import { motion } from "framer-motion";
import { WiRaindrop } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

export default function HoursWeatherCard({ hour, delay = 0 }) {
  function formatTime(time) {
    const date = new Date(time);
    return date.toLocaleTimeString("en-UK", {
      hour24: true,
      hour: "numeric",
      minute: "numeric",
    });
  }

  return (
    <motion.div
      className="grid grid-cols-8 gap-6 place-items-center p-4 bg-gray-800 border border-gray-200 rounded-lg shadow hover:scale-110 m-1"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {console.log(hour)}
      <h2 className="col-span-1">{formatTime(hour.time)}</h2>
      <p className="col-span-1">{hour.temp_c} &#176;C</p>
      <img
        className="col-span-1"
        src={hour.condition.icon}
        alt={hour.condition.text}
      />
      <p className="col-span-1">{hour.condition.text}</p>
      <p className="col-span-2 flex gap-1 items-center">
        <WiRaindrop />
        {hour.chance_of_rain} %
      </p>
      <p className="col-span-2 flex gap-1 items-center">
        <FaWind />
        {hour.wind_kph} km/h
      </p>
    </motion.div>
  );
}
