import { useState } from "react";
import CurrentLocation from "./Location";
import { PersonalDetails } from "./PersonalDetails";
import {ProgressLog} from "./ProgressLog";
import {Equipment} from "./Equipment";
import { BlastingLog } from "./BlastingLog";
import { Attendance } from "./Attendance";
import { Report } from "./Report";

export const Dashboard = () => {
   const [selectedComponent, setSelectedComponent] = useState(null);
   const handleButtonClick = (component) => {
    setSelectedComponent(prev => prev === component ? null : component);
 };
   const renderComponent = () => {
      switch (selectedComponent) {
        case "Report":
          return <Report />;
        case "ProgressLog":
          return <ProgressLog />;
        case "BlastingLog":
          return <BlastingLog />;
        case "Equipment":
          return <Equipment />;
        default:
          return null;
      }
    };

   return (
      <div className="flex flex-col w-full justify-center items-center ">
         <PersonalDetails />
         {/* <CurrentLocation /> */}
         <div className="flex flex-row space-x-5 mb-10 mt-20">
          <div className="flex flex-col justify-center items-center w-80 h-36 border-2 border-black rounded-xl space-y-7">
            <h1 className="text-lg font-serif">Update Production Report</h1>
            <button onClick={() => handleButtonClick("Report")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Report</button>
          </div>
          <div className="flex flex-col justify-center items-center w-80 h-36 border-2 border-black rounded-xl space-y-7">
            <h1 className="text-lg font-serif">Update Progress Log</h1>
            <button onClick={() => handleButtonClick("ProgressLog")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Progress Log</button>
          </div>
          <div className="flex flex-col justify-center items-center w-80 h-36 border-2 border-black rounded-xl space-y-7">
            <h1 className="text-lg font-serif">Update Blasting Log</h1>
            <button onClick={() => handleButtonClick("BlastingLog")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Blasting Log</button>
          </div>
          <div className="flex flex-col justify-center items-center w-80 h-36 border-2 border-black rounded-xl space-y-7">
            <h1 className="text-lg font-serif">Update Equipment Log</h1>
            <button onClick={() => handleButtonClick("Equipment")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Equipment</button>
          </div>
         
         </div> 
        {renderComponent()}
        <Attendance />
      </div>
   )
}