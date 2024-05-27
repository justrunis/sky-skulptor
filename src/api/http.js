import axios from "axios";
import env from "react-dotenv";
import { QueryClient } from "@tanstack/react-query";

const URL = "http://api.weatherapi.com/v1";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const FULL_FORECAST_URL = `${URL}/forecast.json?key=${API_KEY}`;
const FULL_DAYS_URL = `${URL}/forecast.json?key=${API_KEY}`;

export const queryClient = new QueryClient();

export async function fetchWeatherData({ location, days }) {
  try {
    const response = await axios.get(FULL_FORECAST_URL, {
      params: {
        q: location,
        days: days,
      },
    });

    if (response.status === 400) {
      const error = new Error("An error occurred while fetching weather data");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    if (!response.data) {
      const error = new Error("An error occurred while fetching weather data");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    } else {
      return error;
    }
  }
}

export async function fetchWeatherForEachHour({ location }) {
  try {
    const response = await axios.get(FULL_DAYS_URL, {
      params: {
        q: location,
        days: 2, // get 2 days in case the user wants to see the weather for the next 24 hours
      },
    });

    if (response.status === 400) {
      const error = new Error("An error occurred while fetching weather data");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    if (!response.data) {
      const error = new Error("An error occurred while fetching weather data");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    } else {
      return error;
    }
  }
}
