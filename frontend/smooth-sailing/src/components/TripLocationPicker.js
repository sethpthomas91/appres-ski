// this component will return a lat long for the user to select their locaiton for their trips

// bootstrap
import { Container } from "react-bootstrap";

// react
import { useRef,useState } from "react";

// google maps
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import GoogleMapStyle from "../styles/GoogleMapStyle";

const TripLocationPicker = (props) => {
  // props
  const { location, setLocation } = props
  // googlemap
  const libraries = [ "places" ];
  const GM_API_KEY = 'AIzaSyCfb3szDWlmkBP2-eTqLi4uwZQxQZBNbrc';
  const mapContainerStyle = {
    width : '70vw',
    height : '70vh',
  };
  let center = location;
  // can change styles based on snazzy maps
  const options = {
    styles : GoogleMapStyle,
    // this takes off all of the user interface elements
    disableDefaultUI : true,
    zoomControl : true
  };
  // handles the rendering of google map
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey : GM_API_KEY,
    libraries,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  // location click handler
  const onMapClickHandler = (event) => {
    let tempLocation = {...location}
    tempLocation.lat = event.latLng.lat()
    tempLocation.lng = event.latLng.lng()
    setLocation(tempLocation)
  } 



  // render
  return (
    <Container>
      <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      zoom={14} 
      center={center}
      options={options}
      onClick={(event) => onMapClickHandler(event)}
      >
      </GoogleMap>
    </Container>
  )
}

export default TripLocationPicker;