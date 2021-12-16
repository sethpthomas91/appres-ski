const BASE_URL = 'http://localhost:8000/core/'
const TRIPS_URL_ADD = 'trips/'
const BOATS_URL_ADD = 'boats/'
const LOCATIONS_URL_ADD = 'locations/'

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

// this grabs all of the trips, the token may limit based on user id
const fetchTrips = async (token) => {
  const url = BASE_URL + TRIPS_URL_ADD
  const init = {
    headers : {
      'Content-Type' : 'application/json',
      Authorization : `JWT ${token}`
    }
  }
  return await tryCatchFetch(url, init)
}
// grabs the boats based on the user id
const fetchBoats = async (token) => {
  const url = BASE_URL + BOATS_URL_ADD
  const init = {
    headers : {
      'Content-Type' : 'application/json',
      Authorization : `JWT ${token}`
    }
  }
  return await tryCatchFetch(url, init)
}

const addLocation = async (locationObj, token) => {
  // this is set to the base url because of REST framework
  const url = BASE_URL + LOCATIONS_URL_ADD
  const init = {
    method : "POST",
    headers: {
      'Content-Type' : 'application/json',
      Authorization : `JWT ${token}`
    }, 
    body: JSON.stringify(locationObj)
  }
  return await tryCatchFetch(url, init)
}


const exportCalls = {
  fetchTrips,
  fetchBoats,
  addLocation,
}

export default exportCalls