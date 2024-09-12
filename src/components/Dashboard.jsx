import { useState } from "react";
import CurrentLocation from "./Location";
import { PersonalDetails } from "./PersonalDetails";
import { Attendance } from "./Attendance";
import { Report } from "./Report";

export const Dashboard = () => {

   const [error, setError] = useState(false);
   const [attendance, setAttendance] = useState([
      {
         name: "",
         present: false,
         working_hours: 0
      }
   ]);


   return (
      <>
         <PersonalDetails />
         <CurrentLocation />
         <Attendance />
         <Report />
      </>
   )
}