import { useState } from "react";

export const BlastingLog = () => {
   const [time, setTime] = useState("");
   const [longitude, setLongitude] = useState("");
   const [latitude, setLatitude] = useState("");
   const [areaCovered, setAreaCovered] = useState("");
   const [postBlastReview, setPostBlastReview] = useState("");

   const handleChange = (setter) => (e) => {
      setter(e.target.value);
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      if (time && longitude && latitude && areaCovered) {
         setTime("");
         setLongitude("");
         setLatitude("");
         setAreaCovered("");
         setPostBlastReview("");
      } else {
         alert("Please fill in all required fields.");
      }
   };

   return (
      <div>
         <br />
         <br />
         <h1>Blasting Log</h1>

         <form onSubmit={handleSubmit}>
            <div>
               <label>
                  Time:
                  <input
                     type="datetime-local"
                     value={time}
                     onChange={handleChange(setTime)}
                     required
                  />
               </label>
            </div>
            <div>
               <label>
                  Longitude:
                  <input
                     type="number"
                     step="any"
                     value={longitude}
                     onChange={handleChange(setLongitude)}
                     required
                  />
               </label>
            </div>
            <div>
               <label>
                  Latitude:
                  <input
                     type="number"
                     step="any"
                     value={latitude}
                     onChange={handleChange(setLatitude)}
                     required
                  />
               </label>
            </div>
            <div>
               <label>
                  Area Covered (sq. km):
                  <input
                     type="number"
                     value={areaCovered}
                     onChange={handleChange(setAreaCovered)}
                     required
                  />
               </label>
            </div>
            <div>
               <label>
                  Post-Blast Review:
                  <textarea
                     value={postBlastReview}
                     onChange={handleChange(setPostBlastReview)}
                  />
               </label>
            </div>
            <button type="submit">Submit Log</button>
         </form>
      </div>
   );
};
