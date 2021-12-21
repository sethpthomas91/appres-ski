// bootstrap
import { Container, Card, Button } from "react-bootstrap"



const GeneralForecast = (props) => {
  // props
  const {forecast} = props

  return (
    <Card>
      <Card.Header>Current Forecast</Card.Header>
      <Card.Body>
        <Card.Title>Forecast for {forecast.properties.periods[0].name} : {forecast.properties.periods[0].shortForecast}</Card.Title>
        <Card.Text>
          Daytime: {forecast.properties.periods[0].detailedForecast}
        </Card.Text>
        <Card.Text>
          Evening : {forecast.properties.periods[1].detailedForecast}
        </Card.Text>
        <Card.Img variant={`${forecast.properties.periods[0].shortForecast} icon`} src={forecast.properties.periods[0].icon} />
      </Card.Body>
    </Card>
  )
}

export default GeneralForecast