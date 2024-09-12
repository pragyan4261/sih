import details from "../data/details.json"


import { Attendance } from "./Attendance";
import CurrentLocation from "./Location";

export const PersonalDetails = () => {
   return (
      <>
         <div className="flex flex-col w-full justify-center items-center">
            <h1 className="text-3xl font-bold font-serif mt-5">User Details:</h1>
            {details.map((user, index) => (
               <div key={index} className="border-2 w-4/6 m-auto border-black rounded-2xl p-5">
                  <h2 className="text-2xl font-bold font-serif">{user.firstName} {user.lastName}</h2>
                  <p className="text-md font-semibold text-gray-600">Email: {user.email}</p>
                  <p className="text-md font-semibold text-gray-600">Contact Number: {user.contactNumber}</p>
                  <CurrentLocation />

                  <Attendance index={index} />
               </div>

            ))}
         </div>

      </>
   );
};

