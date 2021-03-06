// bootstrap
import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import HourlyChart from "../charts/HourlyChart"
import GeneralForecast from "./GeneralForecast"
// components
// helpers
import WeatherHelper from '../../helper/WeatherHelper';
import DayOfOverview from "./DayOfOverview";


const ForecastContainer = (props) => {
  // props
  const { trip, boat, forecast, isHourly} = props
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
          <Container>
          <HourlyChart hourlyData={hourlyData} boat={boat}/>
          <DayOfOverview hourlyData={hourlyData}/>
          </Container>
          :
          <></>
      }
      </Col>
    </Container>
  )
}

export default ForecastContainer