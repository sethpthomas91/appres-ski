// Router
import { useNavigate, useParams } from "react-router-dom"
// bootstrap
import { Form, Button, Container, Card } from "react-bootstrap"
// react
import { useEffect, useState, useContext } from "react"
import UserContext from '../contexts/UserContext';
// API Calls
import SailAPI from '../api/SailAPI'
// css styling
import '../styles/form_styles/TripFormStyles.css'


const EditTripPage = () => {
  // context
  const userContext = useContext(UserContext);
  const { user } = userContext
  // params
  const params = useParams()
  const tripID = params['tripID']
  // state
  const [trip, setTrip ] = useState(null)
  const [boatList, setBoatList ] = useState(null)
  const [locations, setLocations ] = useState(null)
  const [defaultBoat, setDefaultBoat] = useState(null)
  const [defaultLocation, setDefaultLocation] = useState(null)

  // router props
  const navigate = useNavigate()

  // gets the trip and populates the data
  useEffect(() => {
    const getTrip = async () => {
      const userToken = localStorage['auth-user']
      const data = await SailAPI.fetchTripById(userToken, tripID)
      if (data) {
        setTrip(data)
      }
    }
    getTrip()
  }, [])

  // gets the boat list
  useEffect(() => {
    const getUserBoats = async () => {
      const userToken = localStorage['auth-user']
      const data = await SailAPI.fetchBoats(userToken)
      if (data && trip) {
        setBoatList(data)
        // sets the default boat in the form
        const tempBoat = data.filter((obj) => {
          if (obj['id'] == trip['boat']) {
            return obj
          }
        })
        setDefaultBoat(tempBoat[0])
      }
    }
    getUserBoats()
  },[ trip ])

  useEffect(() => {
    const getLocations = async () => {
      const userToken = localStorage['auth-user']
      const data = await SailAPI.fetchLocations(userToken)
      if (data && trip) {
        setLocations(data)
        // sets the default location in the form
        const tempLocation = data.filter((obj) => {
          if (obj['id'] == trip['location']) {
            return obj
          }
        })
        setDefaultLocation(tempLocation[0])
      }
    }
    getLocations()
  }, [ trip ]) 

  // helpers
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

  // event handler
  const handleEditTripFormSubmit = async (event) => {
    event.preventDefault()
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
    const data = await SailAPI.editTrip(tripData, tripID, userToken)
    navigate(`/trips/${tripID}`)
  }

  // render
  return (
    <Container fluid className="background">
      {!trip && !defaultLocation
        ?
        <h1>Error Loading Form</h1>
        :
        <Card>
          <Card.Header>Edit your trip below</Card.Header>
          <Card.Body>

            <Form onSubmit={handleEditTripFormSubmit}>
              <Form.Group>
                <Form.Label>Trip Name</Form.Label>
                <Form.Control defaultValue={trip.trip_name} required />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Select Trip Date</Form.Label>
                <Form.Control defaultValue={trip.trip_date} type='date' required />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Select value={trip.location} required>
                  {defaultLocation && locations && renderLocationComponents()}
                </Form.Select>
              </Form.Group>
              <br />
              <br />
              <Form.Group>
                <Form.Label>Boat</Form.Label>
                <Form.Select value={trip.boat} required>
                  {defaultBoat && boatList && renderUserBoats()}
                </Form.Select>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control defaultValue={trip.description} as="textarea" rows={3} placeholder="description" required />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit">
                Create Trip
              </Button>
            </Form>
          </Card.Body>
        </Card>
      }
    </Container>
      
  )
}

export default EditTripPage