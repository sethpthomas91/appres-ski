import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"

const TripDetailPage = () => {
  // params
  const params = useParams()
  console.log(params)
  return (
    <Container>
      Trip detail page
    </Container>
  )

}

export default TripDetailPage