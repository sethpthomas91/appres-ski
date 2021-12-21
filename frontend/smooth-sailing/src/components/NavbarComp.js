// bootstrap
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
// css stylimg
import '../styles/component_styles/NavbarCompStyle.css';

const NavbarComp = (props) => {
  // props
  const { username, handleLogout } = props
  return (
    <Navbar className="top-screen-cover" expand="lg">
      <Container>
        <Navbar.Brand href="/">Smooth Sailing</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
        <Navbar.Brand> {username} </Navbar.Brand>
        <Button onClick={handleLogout}> Logout </Button>
      </Container>
    </Navbar>
  )
}

export default NavbarComp