// bootstrap
import { Container } from "react-bootstrap"

const ForecastContainer = (props) => {
  const { location, trip, boat, forecast, isHourly } = props

  return (
    <Container>
      <h5> Trip Name: {trip && trip.trip_name} </h5>
      <h5> Date: {trip && trip.trip_date}  </h5>
      <h5> Description: {trip && trip.description}  </h5>
      <hr />
      <h5> Location: {location && location.location_name}  </h5>
      <h5> Location: {location && `Lat: ${location.latitude}, Long: ${location.longitude}`}  </h5>
      <hr />
      <h5> Boat: {boat && boat.boat_name}  </h5>
      <h5> Max Wind: {boat && boat.max_wind}  </h5>
      <h5> Min Wind: {boat && boat.min_wind}  </h5>
      <hr />
      <h3>Forecast Information</h3>
      {
        !isHourly && forecast
          ?
          <>
            <h3>Forecast for {forecast.properties.periods[0].name}</h3>
            <h3>Current Forecast: {forecast.properties.periods[0].shortForecast}</h3>
            <img alt={`${forecast.properties.periods[0].shortForecast} icon`} src={forecast.properties.periods[0].icon} width={'30px'} height={'30px'} />
            <h3>Current Temp: {forecast.properties.periods[0].temperature} </h3>
            <h3>Daytime: {forecast.properties.periods[0].detailedForecast} Evening : {forecast.properties.periods[1].detailedForecast} </h3>
          </>
          :
          <>
            <h2>Loading Current Weather</h2>
          </>
      }
    </Container>
  )
}

export default ForecastContainer