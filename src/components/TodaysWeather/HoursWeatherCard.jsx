import { motion } from "framer-motion";

export default function HoursWeatherCard({ hour, delay = 0 }) {
  function formatTime(time) {
    const date = new Date(time);
    return date.toLocaleTimeString("en-UK", {
      hour24: true,
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
    });
  }

  return (
    <motion.div
      className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <h2 className="text-xl font-bold mb-2 text-center">
        {formatTime(hour.time)}
      </h2>
      <div className="flex justify-center items-center gap-2">
        <img src={hour.condition.icon} alt={hour.condition.text} />
        <p className="flex flex-col items-center text-baclk">{hour.temp_c} C</p>
      </div>
    </motion.div>
  );
}
