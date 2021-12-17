import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
// API call
import SailAPI from '../../api/SailAPI';

const AddTripForm = (props) => {
  // props
  const { user } = props 
  // states
  const [ locations, setLocations ] = useState(null)
  const [ boatList, setBoatList ] = useState([])

  // handlers
  const handleTripFormSubmit =  async (event) => {
    event.preventDefault()

    // get the user token in localstorage
    const userToken = localStorage['auth-user']

    const tripData = {
      trip_name : event.target.elements[0].value,
      trip_date: event.target.elements[1].value,
      // there should be a better way of accessing this profile or setting a default value
      profile : user.profile ? user.profile : 1,
      location: event.target.elements[2].value,
      description : event.target.elements[4].value,
      boat: Number(event.target.elements[3].value),
    }
    console.log(tripData)

    const data = await SailAPI.addTrip(tripData, userToken)
    // still need to finish this post
  }

  // effects
  // main purpose is the generate the list of all locations
  useEffect(() => {
    const getLocations = async () => {
      const userToken = localStorage['auth-user']
      const data = await SailAPI.fetchLocations(userToken)
      if (data) {
        setLocations(data)
      }
    }
    getLocations()
  }, [locations]) 
  // this should generate all of the boats for the user
  useEffect(() => {
    const getUserBoats = async () => {
      const userToken = localStorage['auth-user']
      const data = await SailAPI.fetchBoats(userToken)
      if (data) {
        setBoatList(data)
      }
    }
    getUserBoats()
  },[])

  // helper functions
  // this renders all of the locations that are in the database
  const renderLocationComponents = () => {
    if (locations == null) {
      return (
      <option> Please create a trip! </option>
      )
    }
    else {
      return locations.map((location, index) => {
        return (
        <option key={index} value={location.id}>{location.location_name}</option>
        )
      })
    }
  }

  // this renders all of the boats that the user has and builds them as a selection
  const renderUserBoats = () => {
    if (boatList == null) {
      return (
        <option> You have no boats! </option>
      )
    } else {
      return boatList.map((boat, index) => {
        return (
          <option key={index} value={boat.id}>{boat.boat_name}</option>
        )
      })
    }
  }

  // render
  return (
    <Form onSubmit={handleTripFormSubmit}>
      <Form.Group>
        <Form.Label>Trip Name</Form.Label>
        <Form.Control placeholder="MLK Day day sail" required/>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Select Trip Date</Form.Label>
        <Form.Control type='date' required />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Select required>
          { renderLocationComponents() }
        </Form.Select>
      </Form.Group>
      <br />
      <br />
      <Form.Group>
        <Form.Label>Boat</Form.Label>
        <Form.Select required>
          { renderUserBoats() }
        </Form.Select>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="description" required/>
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">
        Create Trip
      </Button>
    </Form>  
  )
}

export default AddTripForm;