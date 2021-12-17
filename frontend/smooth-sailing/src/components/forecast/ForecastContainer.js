// bootstrap
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import HourlyChart from "../charts/HourlyChart"
import GeneralForecast from "./GeneralForecast"
// components
// helpers
import WeatherHelper from '../../helper/WeatherHelper';


const ForecastContainer = (props) => {
  // props
  const { location, trip, boat, forecast, isHourly} = props
  // state
  const [ hourlyData, setHourlyData ] = useState(null)

  useEffect(() => {
    let tempData = hourlyData
      if (forecast && trip){
      tempData = WeatherHelper.hourlyDeconstructor(forecast, trip.trip_date)
      setHourlyData(tempData)
      console.log(tempData)
    }
  }, [forecast, trip]) //only renders upon initial call of component

  // render
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
          <GeneralForecast forecast={forecast} />
          :
          <></>
      }
      {
        isHourly && hourlyData
          ?
          <HourlyChart hourlyData={hourlyData} boat={boat}/>
          :
          <h1>No information for chart available.</h1>
      }
    </Container>
  )
}

export default ForecastContainer