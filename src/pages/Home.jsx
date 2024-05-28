import React from "react";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto flex flex-col items-center justify-center bg-primary text-primary-content rounded-lg mt-8 p-8 m-5"
      >
        <h1 className="text-4xl mb-8 text-center">Welcome to Sky Skulptor</h1>
        <p className="text-lg mb-8 text-center">
          Get the latest weather information for your location or any other
          location worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
            className="btn btn-accent text-accent-content custom-animation"
          >
            <Link to="/today">Today</Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 120 }}
            className="btn btn-accent text-accent-content custom-animation"
          >
            <Link to="/weekly">Weekly</Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 120 }}
            className="btn btn-accent text-accent-content custom-animation"
          >
            <Link to="/local" className="">
              Local
            </Link>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </main>
  );
}
