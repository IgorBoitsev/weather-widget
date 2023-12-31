const addZero = (time) => {
  if (time < 10) {
    return '0' + time;
  } else {
    return time;
  }
}

export const getcurrentDateTime = () => {

  const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'сен', 'окт', 'ноя', 'дек']; 

  const weekDays = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

  const date = new Date();
  const year = date.getFullYear();
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const dayOfWeek = weekDays[date.getDay()];

  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());

  return { year, dayOfMonth, month, dayOfWeek, hours, minutes };

};

export const calculateDewPoint = (temp, hum) => {

  const a = 17.27,
        b = 237.7;

  const ft = (a * temp) / (b + temp) + Math.log(hum / 100);
  const dewPoint = (b * ft) / (a - ft);

  return dewPoint.toFixed(1);
};

export const getWeatherForecastData = (data) => {

  const weekDaysShort = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

  const forecast = data.list.filter(item => 
    new Date(item.dt_txt).getHours() === 12 && 
    new Date(item.dt_txt).getDate() > new Date().getDate() &&
    new Date(item.dt_txt).getDate() < new Date().getDate() + 5
  );
  
  const forecastData = forecast.map(item => {
    const date = new Date(item.dt_txt);

    const dayOfWeek = weekDaysShort[date.getDay()];

    const weatherIcon = item.weather[0].icon;

    let minTemp = Infinity;
    let maxTemp = -Infinity;

    for (let i = 0; i < data.list.length; i++) {
      const temp = data.list[i].main.temp;
      const tempDate = new Date(data.list[i].dt_txt);

      if (tempDate.getDate() === date.getDate()) {
        if (temp < minTemp) {
          minTemp = temp;
        }
        
        if (temp > maxTemp) {
          maxTemp = temp;
        }
      }
    }


    return { dayOfWeek, weatherIcon, minTemp, maxTemp };
  });

  return forecastData;

}