// this component will show a current list of boats that the user has
// bootstrap
import { Table,Button, Card } from "react-bootstrap";
// router 
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// API Call
import SailAPI from '../api/SailAPI';

const BoatListComp = () => {
  // state
  const [ boatList, setBoatList ] = useState([])
  // router
  const navigate = useNavigate()
  // effects
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

  // list constructor
  const renderUserBoats = () => {
    if (!boatList) {
      return (
        <tr>
          <td colSpan="5">You have no trips!</td>
        </tr>
      )
    } else {
      return boatList.map((boat, index) => {
        return (
          <tr key={index}>
            <td>{boat.boat_name}</td>
            <td>Condition</td>
          </tr>
        )
      })
    }
  }

  // render
  return (
    <Card>
      <Card.Header>My Boats</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Boat Name</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {boatList && renderUserBoats()}
            <tr>
              <td colSpan="2" onClick={() => navigate('/boats/add')}><Button>Add New Boat</Button></td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )

}

export default BoatListComp