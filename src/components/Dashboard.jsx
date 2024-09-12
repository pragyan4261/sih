
import CurrentLocation from "./Location";
import { PersonalDetails } from "./PersonalDetails";
import { Attendance } from "./Attendance";
import { Report } from "./Report";
import { Equipment } from "./Equipment";
import { BlastingLog } from "./BlastingLog";
import { ProgressLog } from "./ProgressLog";
import { Shifts } from "./Shifts";
export const Dashboard = () => {

   return (
      <>
         <PersonalDetails />
         <CurrentLocation />
         <Shifts />
         <Attendance />
         <Report />
         <Equipment />
         <BlastingLog />
         <ProgressLog />
      </>
   )
}