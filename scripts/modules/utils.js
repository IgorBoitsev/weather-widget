const addZero = (time) => {
  if (time < 10) {
    return '0' + time;
  } else {
    return time;
  }
}

export const getcurrentDateTime = () => {

  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'сен',
    'окт',
    'ноя',
    'дек'
  ]; 

  const weekDays = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота'
  ];

  const date = new Date();
  const year = date.getFullYear();
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const dayOfWeek = weekDays[date.getDay()];

  let hours = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());

  return { year, dayOfMonth, month, dayOfWeek, hours, minutes };
}