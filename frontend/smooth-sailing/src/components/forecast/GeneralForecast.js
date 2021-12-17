// bootstrap
import { Container } from "react-bootstrap"



const GeneralForecast = (props) => {
  // props
  const {forecast} = props

  return (
    <Container>
      <h3>Forecast for {forecast.properties.periods[0].name}</h3>
      <h3>Current Forecast: {forecast.properties.periods[0].shortForecast}</h3>
      <img alt={`${forecast.properties.periods[0].shortForecast} icon`} src={forecast.properties.periods[0].icon} width={'30px'} height={'30px'} />
      <h3>Current Temp: {forecast.properties.periods[0].temperature} </h3>
      <h3>Daytime: {forecast.properties.periods[0].detailedForecast} Evening : {forecast.properties.periods[1].detailedForecast} </h3>
    </Container>
  )
}

export default GeneralForecast