import { useState } from "react";
import workerDetails from "../data/workerDetails.json"

export const Attendance = () => {
   const [presentCount, setPresentCount] = useState(0);
   const [attendance, setAttendance] = useState(
      workerDetails.reduce((acc, worker) => {
         acc[worker.name] = false;
         return acc;
      }, {})
   );


   const handleCheckboxChange = (name) => {
      setAttendance((prevState) => ({
         ...prevState,
         [name]: !prevState[name]
      }));
   };

   return (
      <>
         <h1>Worker Details:</h1>
         {workerDetails.map((user, index) => (
            <div key={index}>
               <h2>{user.name}</h2>
               <p>Contact Number: {user.phoneNumber}</p>
               <label>
                  <p>Present:</p>
                  <input
                     type="checkbox"
                     checked={attendance[user.name]}
                     onChange={() => handleCheckboxChange(user.name)}
                  />
               </label>
            </div>
         ))}
      </>
   )
}