import { Card, Button } from "react-bootstrap"

const TripCard = (props) => {
  const { trip, location} = props



  return (
    <Card>
      <Card.Header as="h5">{trip.trip_name}</Card.Header>
      <Card.Body>
        <Card.Title>Sailing Date: {trip.trip_date}</Card.Title>
        <Card.Title>Location: {location.location_name}</Card.Title>
        <Card.Text>
          Notes: {trip.description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TripCard