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

// this grabs the trip by ID, the token will limit to one that is owned by the user
const fetchTripById = async (token, tripID) => {
  const url = BASE_URL + TRIPS_URL_ADD + tripID + "/"
  const init = {
    headers : {
      'Content-Type' : 'application/json',
      Authorization : `JWT ${token}`
    }
  }
  return await tryCatchFetch(url, init)
}

// grabs the boats based on the user id, the token should limit to ones owned by the user
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

// grabs the boats based on the user id and boat id
const fetchBoatById = async (token, boatID) => {
  const url = BASE_URL + BOATS_URL_ADD + boatID + '/'
  const init = {
    headers : {
      'Content-Type' : 'application/json',
      Authorization : `JWT ${token}`
    }
  }
  return await tryCatchFetch(url, init)
}

const addBoat = async (boatObj, token) => {
  const url = BASE_URL + BOATS_URL_ADD
  const init = {
    method : "POST",
    headers : {
      'Content-Type' : 'application/json',
      Authorization : `JWT ${token}`
    },
    body : JSON.stringify(boatObj)
  }
  return await tryCatchFetch(url, init)
}

const deleteBoat = async (boatID, token) => {
  const url = BASE_URL + BOATS_URL_ADD + boatID + '/'
  const init = {
    method : "DELETE",
    headers: {
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

const addTrip = async (tripObj, token) => {
  // this is set to the base url because of REST framework
  const url = BASE_URL + TRIPS_URL_ADD
  const init = {
    method : "POST",
    headers: {
      'Content-Type' : 'application/json',
      Authorization : `JWT ${token}`
    }, 
    body: JSON.stringify(tripObj)
  }
  return await tryCatchFetch(url, init)
}

const editTrip = async (tripObj, tripID, token) => {
  // this is set to the base url because of REST framework
  const url = BASE_URL + TRIPS_URL_ADD + tripID + "/"
  const init = {
    method : "PATCH",
    headers: {
      'Content-Type' : 'application/json',
      Authorization : `JWT ${token}`
    }, 
    body: JSON.stringify(tripObj)
  }
  return await tryCatchFetch(url, init)
}

const deleteTrip = async (tripID, token) => {
  // this is set to the base url because of REST framework
  const url = BASE_URL + TRIPS_URL_ADD + tripID + '/'
  const init = {
    method : "DELETE",
    headers: {
      'Content-Type' : 'application/json',
      Authorization : `JWT ${token}`
    }
  }
  return await tryCatchFetch(url, init)
}

const fetchLocations = async (token) => {
  // this is set to the base url because of REST framework
  const url = BASE_URL + LOCATIONS_URL_ADD
  const init = {
    method : "GET",
    headers: {
      'Content-Type' : 'application/json',
      Authorization : `JWT ${token}`
    }
  }
  return await tryCatchFetch(url, init)
}

const fetchLocationById = async (token, locationID) => {
  // this is set to the base url because of REST framework
  const url = BASE_URL + LOCATIONS_URL_ADD + locationID + '/'
  const init = {
    method : "GET",
    headers: {
      'Content-Type' : 'application/json',
      Authorization : `JWT ${token}`
    }
  }
  return await tryCatchFetch(url, init)
}


const exportCalls = {
  fetchTrips,
  fetchBoats,
  addBoat,
  deleteBoat,
  fetchBoatById,
  addLocation,
  fetchLocations,
  fetchLocationById,
  addTrip,
  editTrip,
  deleteTrip,
  fetchTripById,
}

export default exportCalls