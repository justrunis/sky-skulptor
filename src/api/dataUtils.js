export const processData = (forecast, currentHour) => {
  let todayData = {};
  let tomorrowData = {};

  forecast.forecastday.forEach((day, index) => {
    day.hour.forEach((hour) => {
      const hourTime = new Date(hour.time).getHours();
      const isToday = index === 0 && hourTime >= currentHour;
      const isTomorrow = index === 1 || (index === 0 && hourTime < currentHour);

      const dataObject = {
        time: hour.time,
        temp: hour.temp_c,
        rain: hour.chance_of_rain,
        cloud: hour.cloud,
        wind: hour.wind_kph,
      };

      if (isToday) {
        todayData[hourTime] = dataObject;
      } else if (isTomorrow) {
        tomorrowData[hourTime] = dataObject;
      }
    });
  });

  return { todayData, tomorrowData };
};

export const sortAndCombineData = (todayData, tomorrowData, currentHour) => {
  const combinedData = [];

  for (let i = currentHour; i < 24; i++) {
    if (todayData[i]) {
      combinedData.push({ x: i, ...todayData[i] });
    }
  }

  for (let i = 0; i < currentHour; i++) {
    if (tomorrowData[i]) {
      combinedData.push({ x: i, ...tomorrowData[i] });
    }
  }

  return combinedData;
};
