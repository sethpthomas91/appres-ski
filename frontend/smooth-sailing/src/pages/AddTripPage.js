// react router
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
// bootstrap
import { Form, Button, Container } from "react-bootstrap";
// API call
import SailAPI from "../api/SailAPI";
// context
import UserContext from '../contexts/UserContext';

function AddTripPage() {
  // context 
  const userContext = useContext(UserContext);
  const { user } = userContext

  // router props
  const navigate = useNavigate()

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    
    const tripData = {
      trip_name: event.target.elements[0].value,
      trip_date: event.target.elements[1].value,
      // the profile should be automatically generated
      profile: event.target.elements[2].value,
      // should be a selection from a map and already before the user gets here. will default to 1 now
      location : 1, 
      description: event.target.elements[3].value
    }

    // const data = await SailAPI.addTrip(tripData)
    // if (data) {
    //   navigate(`/wines/${data.id}`)
    // }
  }

  // render
  return (
    <Container>
      <h2>Add Trip Page</h2>
      <hr />
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Trip Name</Form.Label>
          <Form.Control placeholder="MLK Day day sail" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Select Trip Date</Form.Label>
          <Form.Control type='date' required />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control placeholder="location" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="description" />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Create Trip
        </Button>  
      </Form>  
    </Container>
  )
}

export default AddTripPage;