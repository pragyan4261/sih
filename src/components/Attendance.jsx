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
         <h1 className="flex text-3xl font-serif w-full justify-center items-center font-bold mb-5">Worker Details:</h1>
         {workerDetails.map((user, index) => (
            <div key={index} className="flex flex-row border-2 rounded-2xl h-28 mb-5 p-5 border-black w-4/6 m-auto justify-between">
               <div className="flex flex-col">
               <h2 className="text-2xl font-bold font-serif">{user.name}</h2>
               <p className="text-lg font-mono">Contact Number: {user.phoneNumber}</p>
               </div>
               
               <label className="flex flex-row space-x-6 items-center justify-center">
                  <p className="font-mono">Present:</p>
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