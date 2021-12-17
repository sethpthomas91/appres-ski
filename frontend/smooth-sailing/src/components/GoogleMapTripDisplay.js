// bootstrap
import { Container } from "react-bootstrap";

// react
import { useRef,useState } from "react";

// google maps
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import GoogleMapStyle from "../styles/GoogleMapStyle";
const libraries = [ "places" ];



const GoogleMapTripDisplay = () => {
  // states
  const [ locationMark, setLocationMark ] = useState(null);
  // googlemap
  const GM_API_KEY = 'AIzaSyCfb3szDWlmkBP2-eTqLi4uwZQxQZBNbrc';
  const mapContainerStyle = {
    width : "50vw",
    height : "50vh"
  };
  const center = {
    lat : 35.8381 ,
    lng : -78.8000
  };
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
    console.log("LAT:",event.latLng.lat())
    console.log("LNG:",event.latLng.lng())
  } 



  // render
 


  return (
    <Container >
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

export default GoogleMapTripDisplay;