// bootstrap
import { Container, Card } from "react-bootstrap";
// css
import "../styles/component_styles/GoogleMapTripCompStyle.css";
// react
import { useRef,useState } from "react";

// google maps
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import GoogleMapStyle from "../styles/GoogleMapStyle";
const libraries = [ "places" ];




const GoogleMapTripDisplay = (props) => {
  // props
  const { locationsArr } = props

  // generates all markers based on locationsArr prop
  const markerGenerator = (arr) => {
    console.log(arr)

    return arr.map((location) => {
      return (
        <Marker 
        key={location.id} 
        position={{lat: Number(location.latitude), lng: Number(location.longitude)}}
        />
      )
    })
  }

  // googlemap
  const GM_API_KEY = 'AIzaSyCfb3szDWlmkBP2-eTqLi4uwZQxQZBNbrc';
  const mapContainerStyle = {
    width : "500px",
    height : "400px",
    border : "1px solid black",
  };
  const center = {
    // sets center for the first object in the locations array
    lat : Number(locationsArr[0].latitude) ,
    lng : Number(locationsArr[0].longitude)
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
    <Card className="map-card">
      <Card.Header>All Trips</Card.Header>
      <Card.Body>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={center}
          options={options}
          onClick={(event) => onMapClickHandler(event)}
        >
          {locationsArr && markerGenerator(locationsArr)}
        </GoogleMap>
      </Card.Body>
    </Card>

  )
}

export default GoogleMapTripDisplay;