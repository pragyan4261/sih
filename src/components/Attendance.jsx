import { useState, useEffect } from "react";
import workerDetails from "../data/workerDetails.json";

export const Attendance = () => {
   const [attendance, setAttendance] = useState(
      workerDetails.reduce((acc, worker) => {
         acc[worker.name] = false;
         return acc;
      }, {})
   );

   const [presentCount, setPresentCount] = useState(0);

   useEffect(() => {
      const count = Object.values(attendance).filter(status => status).length;
      setPresentCount(count);
   }, [attendance]);

   const handleCheckboxChange = (name) => {
      setAttendance((prevState) => {
         const newStatus = !prevState[name];
         return {
            ...prevState,
            [name]: newStatus
         };
      });
   };

   return (
      <>
         <h1>Worker Details:</h1>
         <p>Total Present: {presentCount}</p>
         {workerDetails.map((user, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
               <p>{user.name}</p>
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
   );
};
