import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const AddLocationForm = (props) => {
  // props
  const { location, handleLocationFormSubmit } = props

  // effects
  useEffect(() => {

  }, [location]) // renders whenever the location is updated

  // render
  return (
    <Form onSubmit={handleLocationFormSubmit}>
      <Form.Group>
        <Form.Label>Place Name</Form.Label>
        <Form.Control placeholder="Lake Crabtree, NC" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Select a location on the map</Form.Label>
        <Form.Control value={`${location['lat']}, ${location['lng']}`} placeholder="Please select a location on the map" readOnly />
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">
        Create Place
      </Button>
    </Form>
  )
}

export default AddLocationForm;