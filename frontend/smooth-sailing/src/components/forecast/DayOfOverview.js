// bootstrap
import { Card } from "react-bootstrap"



const DayOfOverview = (props) => {
  // props
  const { hourlyData } = props

  return (
    <Card>
      <Card.Header>Day of Forecast</Card.Header>
      <Card.Body>
        <Card.Text>
          Morning Weather: {hourlyData[8].shortForecast}
          Morning Temp: {hourlyData[8].temperature}
        </Card.Text>
        <Card.Text>
          Afternoon Weather: {hourlyData[16].shortForecast}
          Afternoon Temp: {hourlyData[16].temperature}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default DayOfOverview