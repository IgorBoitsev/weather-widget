import { fetchForecast, fetchWeather, getCity } from "./APIService.js";
import { renderWidgetToday, renderWidgetOther, renderWidgetForecast, showError } from "./render.js";

export const startWidget = async (city) => {

  if (!city) {
    const dataCity = getCity();

    if (dataCity.success) {
      city = dataCity.city;
    }
  }
  console.log(city);

  const widget = document.createElement('div');
  widget.classList.add('widget');

  const weatherData = await fetchWeather(city);
  const forecastData = await fetchForecast(city);

  if (weatherData.success) {
    renderWidgetToday(widget, weatherData.data);
    renderWidgetOther(widget, weatherData.data);
  } else {
    showError(weatherData.error);
  }

  if (forecastData.success) {
    renderWidgetForecast(widget, forecastData.data);
  } else {
    showError(forecastData.error);
  }

  return widget;

}