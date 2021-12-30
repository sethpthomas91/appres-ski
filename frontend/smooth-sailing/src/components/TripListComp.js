// this component will call for a list of all trips for a particular user, for use on main page display
// react and router
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// bootstrap
import { Button, Table, Card } from "react-bootstrap"
// API Call
import SailAPI from '../api/SailAPI';

const TripListComp = () => {
  // router
  const navigate = useNavigate()
  
  // state
  const [ userTrips, setUserTrips ] = useState([])
  const [ userLocations, setUserLocations ] = useState([])

  // effects
  useEffect(() => {
    const getUserTrips = async () => {
      const userToken = localStorage['auth-user']
      const data = await SailAPI.fetchTrips(userToken)
      if (data) {
        setUserTrips(data)
      }
    }
    getUserTrips()
  },[])

  // effects
  useEffect(() => {
    const getLocations = async () => {
      const userToken = localStorage['auth-user']
      const data = await SailAPI.fetchLocations(userToken)
      if (data) {
        setUserLocations(data)
      }
    }
    getLocations()
  },[userTrips]) //depends on trips to execute

  // list constructor
  const renderUserTrips = () => {
    if (!userTrips) {
      return (
        <tr>
          <td colSpan="5">You have no trips!</td>
        </tr>
      )
    } else {
      
      return userTrips.map((trip, index) => {
        // get the location name
        let tripLocationID = trip.location
        for (let i = 0; i < userLocations.length; i++) {
          if (tripLocationID === userLocations[i].id) {
            let locationName = userLocations[i].location_name
            return (
              // returns the list component with all of the information displayed
              <tr key={index}>
                <td><Link to={`/trips/${trip.id}`}>{trip.trip_name}</Link></td>
                <td>{trip.trip_date}</td>
                <td>{locationName}</td>
              </tr>
            )
          }
        }
      })
    }
  }

  // render
  return (
    <Card>
      <Card.Header>My Trips</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Trip Name</th>
              <th>Sail Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {userTrips && userLocations && renderUserTrips()}
            <tr>
              <td colSpan="5" onClick={() => navigate('/trips/add/')}><Button>Add New Trip</Button></td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default TripListComp