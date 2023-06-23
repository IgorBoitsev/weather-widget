import { calculateDewPoint, getWeatherForecastData, getWindDirection, getcurrentDateTime } from "./utils.js";

export const renderWidgetToday = (widget, widgetWeatherData) => {

  const { year, dayOfMonth, month, dayOfWeek, hours, minutes } = getcurrentDateTime();

  widget.insertAdjacentHTML(
    'beforeend',
    `
    <div class="widget__today">
      <div class="widget__date-block">
        <p class="widget__date">${dayOfMonth} ${month} ${year}</p>
        <p class="widget__time">${hours}:${minutes}</p>
        <p class="widget__day">${dayOfWeek}</p>
      </div>
      <div class="widget__icon">
        <img class="widget__img" src="./icon/${widgetWeatherData.weather[0].icon}.svg" alt="Погода">
      </div>
      <div class="widget__wheather">
        <div class="widget__city">
          <p>${widgetWeatherData.name}</p>
          <button class="widget__change-city" aria-label="Изменить город"></button>
        </div>
        <p class="widget__temp-big">${(widgetWeatherData.main.temp - 273.15).toFixed(0)}°C</p>
        <p class="widget__felt">ощущается</p>
        <p class="widget__temp-small">${(widgetWeatherData.main.feels_like - 273.15).toFixed(1)}°C</p>
      </div>
    </div>
    `
  );

}

export const renderWidgetOther = (widget, widgetWeatherData) => {

  widget.insertAdjacentHTML(
    'beforeend',
    `
    <div class="widget__other">
      <div class="widget__wind">
        <p class="widget__wind-title">Ветер</p>
        <p class="widget__wind-speed">${widgetWeatherData.wind.speed} м/с</p>
        <p class="widget__wind-text">${getWindDirection(widgetWeatherData.wind.deg)}</p>

      </div>
      <div class="widget__humidity">
        <p class="widget__humidity-title">Влажность</p>
        <p class="widget__humidity-value">${widgetWeatherData.main.humidity}%</p>
        <p class="widget__humidity-text">Т.Р: ${calculateDewPoint((widgetWeatherData.main.temp - 273.15), widgetWeatherData.main.humidity)}°C</p>
      </div>
      <div class="widget__pressure">
        <p class="widget__pressure-title">Давление</p>
        <p class="widget__pressure-value">${(widgetWeatherData.main.pressure * 0.75).toFixed(0)}</p>
        <p class="widget__pressure-text">мм рт.ст.</p>
      </div>
    </div>
    `
  );

}

export const renderWidgetForecast = (widget, widgetWeatherData) => {
  console.log('widgetWeatherData: ', widgetWeatherData);

  const widgetForecast = document.createElement('ul');
  widgetForecast.classList.add('widget__forecast');
  widget.append(widgetForecast);

  const forecastData = getWeatherForecastData(widgetWeatherData);

  const items = forecastData.map((item) => {
    const widgetDayItem = document.createElement('li');
    widgetDayItem.classList.add('widget__day-item');

    widgetDayItem.insertAdjacentHTML(
      'beforeend',
      `
        <p class="widget__day-text">${item.dayOfWeek}</p>
        <img class="widget__day-img" src="./icon/${item.weatherIcon}.svg" alt="Погода">
        <p class="widget__day-temp">${(item.minTemp - 273.15).toFixed(1)}°C/${(item.maxTemp - 273.15).toFixed(1)}°C</p>
      `);

    return widgetDayItem;
  });

  widgetForecast.append(...items);

};

export const showError = (widget, error) => {
  widget.textContent = error.toString();
  widget.classList.add('widget_error');
}