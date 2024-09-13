import { useState } from "react";

export const Shifts = () => {
   const [startTime, setStartTime] = useState("");
   const [endTime, setEndTime] = useState("");
   const [location, setLocation] = useState("");
   const [shiftForeman, setShiftForeman] = useState("");

   const handleChange = (setter) => (e) => {
      setter(e.target.value);
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      if (startTime && endTime && location && shiftForeman) {
         const newShift = { startTime, endTime, location, shiftForeman };

         // Retrieve existing shifts from localStorage
         const existingShifts = JSON.parse(localStorage.getItem("shifts")) || [];
         // Add new shift to existing shifts
         existingShifts.push(newShift);

         // Save updated shifts to localStorage
         localStorage.setItem("shifts", JSON.stringify(existingShifts));

         // Clear form fields
         setStartTime("");
         setEndTime("");
         setLocation("");
         setShiftForeman("");
      } else {
         alert("Please fill in all fields.");
      }
   };

   return (
      <div>
         <h1><strong>Shift Log:</strong> </h1>

         <form onSubmit={handleSubmit}>
            <div>
               <label>
                  Start Time:
                  <input
                     type="time"
                     value={startTime}
                     onChange={handleChange(setStartTime)}
                     required
                  />
               </label>
            </div>
            <div>
               <label>
                  End Time:
                  <input
                     type="time"
                     value={endTime}
                     onChange={handleChange(setEndTime)}
                     required
                  />
               </label>
            </div>
            <div>
               <label>
                  Location:
                  <input
                     type="text"
                     value={location}
                     onChange={handleChange(setLocation)}
                     required
                  />
               </label>
            </div>
            <div>
               <label>
                  Shift Foreman:
                  <input
                     type="text"
                     value={shiftForeman}
                     onChange={handleChange(setShiftForeman)}
                     required
                  />
               </label>
            </div>
            <button type="submit">Add Shift</button>
         </form>
      </div>
   );
};