// takes in an hourly api call and a date obj formatted in YYYY-MM-DD and returns a list of hourly weather objects
const hourlyDeconstructor = (forecast, dateObj) => {
  const hourlyForecastObj = forecast.properties.periods
  // get the date from the dateObj
  const date = dateObj.split('-')[2]
  const hourArr = hourlyForecastObj.map( (hour) => {
    // generate a new date time for each hour to compare against the hour
    const hourDateObj = new Date(hour.startTime)
    if (hourDateObj.getDate() == date) {
        // only gets one int for the number
        const hourOnly = new Date(hour.startTime).getHours()
        // splits the "# mph" to just grabt the number
        const windNumOnly = hour.windSpeed.split(' ')
      return  {
        startHour : hourOnly,
        windSpeed : Number(windNumOnly[0]),
        windDirection : hour.windDirection,
        temperature : hour.temperature
      }
    } 
  })
  // filters all that are null or undefined
  const filteredHourArr = hourArr.filter((obj) => {
    return obj
  } )
  console.log(filteredHourArr)
  return filteredHourArr
}

const helperFunctions = {
  hourlyDeconstructor
}

export default helperFunctions 

