export default function isSatSun(date) {
  const modi = date.format('dddd');
  if (modi === 'Saturday' || modi === 'Sunday') {
    return modi
  } else {
    return 'notWeekend'
  }
}