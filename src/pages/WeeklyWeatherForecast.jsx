import { motion } from "framer-motion";
import { useState } from "react";
import Header from "../components/UI/Header";
import SearchContainer from "../components/SearchWeather/SearchContainer";
import WeatherDisplayContainer from "../components/SearchWeather/WeatherDisplayContainer";
import { toast } from "react-toastify";
import Footer from "../components/UI/Footer";

export default function WeeklyWeatherForecast() {
  const [inputData, setInputData] = useState({
    city: "",
    days: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const city = formData.get("city");
    const days = formData.get("days");

    if (city === "" || days === "") {
      toast.error("Please fill in all fields.");
      return;
    }

    setInputData({
      city,
      days,
    });
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <SearchContainer title="Search weekly forecast" onSubmit={handleSubmit} />
      {inputData.city !== "" && inputData.days !== "" && (
        <WeatherDisplayContainer city={inputData.city} days={inputData.days} />
      )}
      <Footer />
    </main>
  );
}
