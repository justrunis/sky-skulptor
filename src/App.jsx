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
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weekly" element={<WeeklyWeatherForecast />} />
          <Route path="/today" element={<TodaysWeatherForecast />} />
          <Route path="/local" element={<LocalWeatherForecast />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
