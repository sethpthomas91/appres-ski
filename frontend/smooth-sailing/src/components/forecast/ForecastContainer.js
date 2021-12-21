// bootstrap
import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import HourlyChart from "../charts/HourlyChart"
import GeneralForecast from "./GeneralForecast"
// components
// helpers
import WeatherHelper from '../../helper/WeatherHelper';
import TripCard from "../TripCard";


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
    }
  }, [forecast, trip])

  // render
  return (
    <Container className="justify-content-md-center">
      <Col xs>
      {trip && location && <TripCard trip={trip} location={location}/>}
      </Col>
      <Col xs>
      {
        !isHourly && forecast
          ?
          <GeneralForecast forecast={forecast} />
          :
          <></>
      }
      </Col>
      <Col xs>
      {
        isHourly && hourlyData
          ?
          <HourlyChart hourlyData={hourlyData} boat={boat}/>
          :
          <></>
      }
      </Col>
    </Container>
  )
}

export default ForecastContainer