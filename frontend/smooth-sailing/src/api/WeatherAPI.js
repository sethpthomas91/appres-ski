const BASE_URL = 'https://api.weather.gov/points/'

const tryCatchFetch = async (url, init=null) => {
  try {
    const response = await fetch(url, init)
    if (response.ok) {
      return await response.json()
    }
    else {
      throw Error(`Bad response ${response.status} ${response.statusText}`)
    }
  }
  catch (e) {
    console.error(e)
    return null
  }
}

// this will change based on what call you want to make. Two options are available (forecast, forecastHourly)
// Forecast hourly should only be called when trip is less than 5 days away so we can have complete hourly information
// true will produce hourly information
// false will produce general current forecast
const fetchNoaaAPICall = async (lat, long, insideHourlyLimit) => {
  const url = BASE_URL + lat + ',' + long
  const init = {
    method : "GET",
  }
  // this call will now have access to more API calls
  const generalInfoCallData = await tryCatchFetch(url, init)

  if (!insideHourlyLimit) {
    return fetchGeneralWeather(generalInfoCallData.properties.forecast)
  }
  if (insideHourlyLimit) {
    return fetchHourlyWeather(generalInfoCallData.properties.forecastHourly)
  }
}

// this function is dependent on getting a url from a previous function, will fetch general weather 6 days out
const fetchGeneralWeather = async (recieved_url) => {
  const url = recieved_url
  const init = {
    method : "GET",
  }
  return await tryCatchFetch(url, init)
}

// this function is dependent on getting a url from a previous function, will fetch hourly weather
const fetchHourlyWeather = async (recieved_url) => {
  const url = recieved_url
  const init = {
    method : "GET",
  }
  return await tryCatchFetch(url, init)
}

const exportCalls = {
  fetchNoaaAPICall
}

export default exportCalls