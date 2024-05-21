import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import SearchContainer from "../components/SearchWeather/SearchContainer";
import { toast } from "react-toastify";
import { useState } from "react";
import TodaysWeatherDisplayContainer from "../components/TodaysWeather/TodaysWeatherDisplayContainer";

export default function TodaysWeatherForecast() {
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const city = formData.get("city");

    if (city === "") {
      toast.error("Please fill in the city field.");
      return;
    }

    setCity(city);
  }
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <SearchContainer
        title="Search 24h forecast"
        hideDays={true}
        onSubmit={handleSubmit}
      />
      {city !== "" && <TodaysWeatherDisplayContainer city={city} />}
      <Footer />
    </main>
  );
}
