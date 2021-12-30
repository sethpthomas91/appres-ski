// bootstrap
import { Form, Button } from "react-bootstrap";
// router
import { useNavigate } from "react-router-dom";
// api call
import SailAPI from "../../api/SailAPI";
// react
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const AddBoatForm = () => {
  // props

  // context
  const userContext = useContext(UserContext);
  const { user } = userContext
  const userID = user.profile
  console.log(user)

  // router
  const navigate = useNavigate()

  // handlers
  const handleBoatFormSubmit =  async (event) => {
    event.preventDefault()

    // get the user token in localstorage
    const userToken = localStorage['auth-user']

    const boatData = {
      boat_name : event.target.elements[0].value,
      owner : userID, 
      max_wind : event.target.elements[1].value,
      min_wind : event.target.elements[2].value,
    }
    console.log(boatData)
    const data = await SailAPI.addBoat(boatData, userToken)

    navigate('/')
  }

  // render
  return (
    <Form onSubmit={handleBoatFormSubmit}>
      <Form.Group>
        <Form.Label>Boat Name</Form.Label>
        <Form.Control placeholder="New Boat Name" required/>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Maximum Wind</Form.Label>
        <Form.Control type="number" required />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Minimum Wind</Form.Label>
        <Form.Control type="number" required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Boat
      </Button>
    </Form>  
  )
}

export default AddBoatForm;