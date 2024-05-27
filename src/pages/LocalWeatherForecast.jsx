import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import { useEffect, useState } from "react";
import LocalWeatherDisplayContainer from "../components/LocalWeather/LocalWeatherDisplayContainer";

export default function LocalWeatherForecast() {
  const [userCoords, setUserCoords] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      {userCoords.latitude === 0 && userCoords.longitude === 0 ? (
        <div className="container mx-auto p-4 bg-primary text-neutral-content rounded-lg mt-8 text-white p-8">
          <p className="text-lg">
            Please enable location services to view the local weather forecast.
          </p>
        </div>
      ) : (
        <LocalWeatherDisplayContainer userCoords={userCoords} />
      )}

      <Footer />
    </main>
  );
}
