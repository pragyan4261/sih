
import CurrentLocation from "./Location";
import { PersonalDetails } from "./PersonalDetails";
import { Attendance } from "./Attendance";
import { Report } from "./Report";
import { Equipment } from "./Equipment";

export const Dashboard = () => {

   return (
      <>
         <PersonalDetails />
         <CurrentLocation />
         <Attendance />
         <Report />
         <Equipment />
      </>
   )
}