// react router
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
// bootstrap
import { Container, Card, Button } from "react-bootstrap";
// API call
import SailAPI from "../api/SailAPI";
// context
import UserContext from '../contexts/UserContext';
// componenents
import TripLocationPicker from "../components/TripLocationPicker";
import AddLocationForm from "../components/forms/AddLocationForm";
import AddTripForm from "../components/forms/AddTripForm";
// css styling
import '../styles/form_styles/TripFormStyles.css'


function AddTripPage() {
  // context 
  const userContext = useContext(UserContext);
  // console.log(userContext.user ? userContext.user.id : "not here")
  const { user } = userContext
  
  // state
  const [ locations, setLocations ] = useState(null)
  const [ location, setLocation ] = useState({
    lat : 35.8381 ,
    lng : -78.8000
  })

  // router props
  const navigate = useNavigate()

  // effects 
  useEffect(() => {
    const getLocations = async () => {
      const userToken = localStorage['auth-user']
      const data = await SailAPI.fetchLocations(userToken)
      if (data) {
        setLocations(data)
      }
    }
    getLocations()
  }, []) 

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
    // grabs all locations for the drop down list
    const tempLocationsData = await SailAPI.fetchLocations(userToken)
    setLocations(tempLocationsData)
    
  }

  // render
  return (
    <Container fluid className="background" >
      <Card>
        <Card.Header>Create a new location on this map.</Card.Header>
        <Card.Body>
          <TripLocationPicker location={location} setLocation={setLocation} />
          <AddLocationForm location={location} handleLocationFormSubmit={handleLocationFormSubmit} />
          <hr />
          <Card.Title>Create your trip below</Card.Title>
          <AddTripForm user={user} locations={locations} />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AddTripPage;