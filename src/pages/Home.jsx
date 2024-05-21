import React from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import Header from "../components/UI/Header";

import weatherImage from "../assets/weather.jpg";
import weatherImage2 from "../assets/weather2.jpg";
import weatherImage3 from "../assets/weather3.jpg";

const Home = () => {
  const { scrollY, scrollYProgress } = useViewportScroll();

  // Set up separate transforms for each image using scroll percentage
  const opacity1 = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.8, 0.8], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-4 bg-primary text-neutral-content rounded-lg mt-8 flex-grow text-white"
      >
        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome to SkySculptor!
        </motion.h1>
        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Your go-to destination for accurate and reliable weather updates and
          forecasts.
        </motion.p>
        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          SkySculptor provides real-time weather information for any location
          worldwide. Whether you're planning a trip, scheduling outdoor
          activities, or simply staying informed about the weather in your area,
          SkySculptor has you covered.
        </motion.p>
        <div className="cta-buttons">
          <div className="flex flex-col justify-center items-center w-full mt-8 gap-4">
            <motion.img
              src={weatherImage}
              alt="Weather spectrum"
              className="w-full md:w-1/2 rounded-lg mt-8"
              style={{ opacity: opacity1 }}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
            <motion.img
              src={weatherImage2}
              alt="Snowy Weather"
              className="w-full md:w-1/2 rounded-lg mt-8"
              style={{ opacity: opacity2 }}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            />
            <motion.img
              src={weatherImage3}
              alt="Snowy Weather"
              className="w-full md:w-1/2 rounded-lg mt-8"
              style={{ opacity: opacity3 }}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default Home;
