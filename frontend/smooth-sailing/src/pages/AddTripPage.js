// react router
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
// bootstrap
import { Form, Button, Container } from "react-bootstrap";
// API call
import SailAPI from "../api/SailAPI";
// context
import UserContext from '../contexts/UserContext';
// componenents
import TripLocationPicker from "../components/TripLocationPicker";
import AddLocationForm from "../components/forms/AddLocationForm";
import AddTripForm from "../components/forms/AddTripForm";


function AddTripPage() {
  // context 
  const userContext = useContext(UserContext);
  // console.log(userContext.user ? userContext.user.id : "not here")
  const { user } = userContext
  
  // state
  const [ location, setLocation ] = useState({
    lat : 35.8381 ,
    lng : -78.8000
  })

  // router props
  const navigate = useNavigate()

  // helper function
  // splits the lat long in the value
  const latLongStringSplitFilter = (str) => {
    // split the string between lat and long and filters
    let arr = str.split(',')
    let longArr = arr[0].split('.')
    let latArr = arr[1].split('.')
    let long = longArr[0] + '.' + longArr[1].slice(0,3)
    let lat = latArr[0] + '.' + latArr[1].slice(0,3)
    console.log(long, lat)

    return [long, lat]
  }

  // handlers
  const handleLocationFormSubmit = async (event) => {
    event.preventDefault()
    // get the user token in localstorage
    const userToken = localStorage['auth-user']
    // create the latlong from the map
    const latLong = await latLongStringSplitFilter(event.target.elements[1].value)
    const lat = latLong[0]
    const long = latLong[1]
    
    const locationData = {
      location_name: event.target.elements[0].value,
      latitude: lat,
      longitude: long
    }

    const data = await SailAPI.addLocation(locationData, userToken)
  }

  // render
  return (
    <Container>
      <h2>Add Trip Page</h2>
      <hr />
      <h3>Create a new location on this map.</h3>
      <TripLocationPicker location={location} setLocation={setLocation}/>
      <AddLocationForm location={location} handleLocationFormSubmit={handleLocationFormSubmit}/>
      <hr />
      <AddTripForm user={user}/>
    </Container>
  )
}

export default AddTripPage;