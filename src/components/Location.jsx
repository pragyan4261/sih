import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";  // Importing location icon from react-icons

const CurrenLocation = () => {
   const [latitude, setLatitude] = useState(null);
   const [longitude, setLongitude] = useState(null);
   const [error, setError] = useState("");

   // Function to get the current location
   const getLocation = () => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               setLatitude(position.coords.latitude);
               setLongitude(position.coords.longitude);
               setError("");  // Clear any previous errors
            },
            (error) => {
               switch (error.code) {
                  case error.PERMISSION_DENIED:
                     setError("User denied the request for Geolocation.");
                     break;
                  case error.POSITION_UNAVAILABLE:
                     setError("Location information is unavailable.");
                     break;
                  case error.TIMEOUT:
                     setError("The request to get user location timed out.");
                     break;
                  default:
                     setError("An unknown error occurred.");
                     break;
               }
            }
         );
      } else {
         setError("Geolocation is not supported by this browser.");
      }
   };

   return (
      <div>
         <div>
            <FaLocationArrow size={30} onClick={getLocation} style={{ cursor: "pointer" }} />
            <p>Click the icon to get your location</p>
         </div>
         {latitude && longitude ? (
            <p>
               Your Location: Latitude: {latitude}, Longitude: {longitude}
            </p>
         ) : (
            <p>{error}</p>
         )}
      </div>
   );
};

export default CurrenLocation;
