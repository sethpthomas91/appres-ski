// this component will call for a list of all trips for a particular user, for use on main page display
// bootstrap
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom";
// API Call
import SailAPI from '../api/SailAPI';

const TripListComp = () => {
  // router
  const navigate = useNavigate()
  
  // state
  const [ userTrips, setUserTrips ] = useState([])
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
        return (
          <tr key={index}>
            <td><Link to={`/trips/${trip.id}`}>{trip.trip_name}</Link></td>
            <td>{trip.trip_date}</td>
            <td>{trip.location}</td>
            <td>Conditions</td>
          </tr>
        )
      })
    }
  }

  // render
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Trip Name</th>
          <th>Sail Date</th>
          <th>Location</th>
          <th>Weather</th>
        </tr>
      </thead>
      <tbody>
      { userTrips && renderUserTrips() }
        <tr>
          <td colSpan="5" onClick={() => navigate('/trips/add/')}><Button>Add New Trip</Button></td>
        </tr>
      </tbody>
    </Table>
  )


}

export default TripListComp