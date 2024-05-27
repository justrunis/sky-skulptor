import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { queryClient } from "./api/http";

import Home from "./pages/Home";
import WeeklyWeatherForecast from "./pages/WeeklyWeatherForecast";
import TodaysWeatherForecast from "./pages/TodaysWeatherForecast";
import LocalWeatherForecast from "./pages/LocalWeatherForecast";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weekly" element={<WeeklyWeatherForecast />} />
            <Route
              path="/today"
              element={<TodaysWeatherForecast />}
              title="Todays Weather Forecast"
            />
            <Route
              path="/local"
              element={<LocalWeatherForecast />}
              title="Local Weather Forecast"
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
