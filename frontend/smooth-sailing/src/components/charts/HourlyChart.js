import { Container, Card, Row, Col } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";

const HourlyChart = (props) => {
  // props
  const { hourlyData, boat } = props
  // states

  const generateChart = () => {
    return (
      <LineChart
        width={700}
        height={300}
        data={hourlyData}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 10
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="startHour" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <ReferenceLine x="0600" stroke="red" label="Boat in water" />
        <ReferenceLine x="1800" stroke="red" label="Boat out water" /> */}
        <ReferenceLine y={boat.max_wind} label="Max" stroke="red" />
        <ReferenceLine y={boat.min_wind} label="Min" stroke="red" />
        <Line type="monotone" dataKey="windSpeed" stroke="#009ee3" activeDot={{ r: 8 }}/>
        {/* <Line type="monotone" dataKey="temperature" stroke="#009ee3"/> */}
      </LineChart>
    )
  
  }
  
  // render
  return (
    <Card>
      <Card.Header>Day of Hourly Data</Card.Header>
      <Row>
        <Col sm={1}>
        <h6>wind speed</h6>
        </Col>
        <Col sm={11}>
        {generateChart()}
        </Col>
      </Row>
    </Card>
  )
}

export default HourlyChart;