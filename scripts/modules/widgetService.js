import { fetchWeather } from "./APIService.js";
import { renderWidgetToday, renderWidgetOther, renderWidgetForecast } from "./render.js";

export const startWidget = async () => {

  const widget = document.createElement('div');
  widget.classList.add('widget');

  const weatherData = await fetchWeather('Москва');
  console.log(weatherData.data);

  if (weatherData.success) {
    renderWidgetToday(widget, weatherData.data);
    renderWidgetOther(widget, weatherData.data);
  } else {

  }

  renderWidgetForecast(widget);

  return widget;

}