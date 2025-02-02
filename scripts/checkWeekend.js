export default function isSatSun(date) {
  const weekDay = date.format('dddd');
  if (weekDay === 'Saturday' ||  weekDay === 'Sunday') {
    return weekDay
  } else {
    return 'notWeekDay'
  }
}