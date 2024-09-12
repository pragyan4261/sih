import { useState, useEffect } from "react";

export const Attendance = () => {
   // Initialize state with data from localStorage or with an empty object if not available
   const [attendance, setAttendance] = useState(() => {
      const storedAttendance = localStorage.getItem("attendanceRecords");
      return storedAttendance ? JSON.parse(storedAttendance) : {};
   });

   const [presentCount, setPresentCount] = useState(0);
   const [newWorker, setNewWorker] = useState({
      name: "",
      phoneNumber: ""
   });

   useEffect(() => {
      // Update present count whenever attendance changes
      const count = Object.values(attendance).filter(worker => worker.present).length;
      setPresentCount(count);
      localStorage.setItem("attendanceRecords", JSON.stringify(attendance)); // Save to local storage
   }, [attendance]);

   const handleCheckboxChange = (name) => {
      setAttendance((prevState) => ({
         ...prevState,
         [name]: {
            ...prevState[name],
            present: !prevState[name].present
         }
      }));
   };

   const handleRemoveWorker = (name) => {
      setAttendance((prevState) => {
         const newState = { ...prevState };
         delete newState[name]; // Remove the worker
         return newState;
      });
   };

   const handleInputChange = (e) => {
      setNewWorker({ ...newWorker, [e.target.name]: e.target.value });
   };

   const handleAddWorker = (e) => {
      e.preventDefault();
      if (newWorker.name && newWorker.phoneNumber) {
         setAttendance((prevState) => ({
            ...prevState,
            [newWorker.name]: { present: false, phoneNumber: newWorker.phoneNumber }
         }));
         setNewWorker({ name: "", phoneNumber: "" }); // Clear form after adding
      }
   };

   return (
      <>
         <h1 className="flex text-3xl font-serif w-full justify-center items-center font-bold mb-5">Worker Details:</h1>
         <p>Total Present: {presentCount}</p>

         {/* Form to add new worker */}
         <form onSubmit={handleAddWorker} className="flex flex-col items-center mb-10">
            <input
               type="text"
               name="name"
               value={newWorker.name}
               placeholder="Worker Name"
               onChange={handleInputChange}
               className="border-2 mb-4 p-2"
               required
            />
            <input
               type="text"
               name="phoneNumber"
               value={newWorker.phoneNumber}
               placeholder="Phone Number"
               onChange={handleInputChange}
               className="border-2 mb-4 p-2"
               required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Worker</button>
         </form>

         {/* Worker attendance details */}
         {Object.keys(attendance).map((workerName, index) => (
            <div key={index} className="flex flex-row border-2 rounded-2xl h-28 mb-5 p-5 border-black w-4/6 m-auto justify-between">
               <div className="flex flex-col">
                  <h2 className="text-2xl font-bold font-serif">{workerName}</h2>
                  <p className="text-lg font-mono">
                     Contact Number: {attendance[workerName].phoneNumber || "N/A"}
                  </p>
               </div>

               <div className="flex flex-row space-x-6 items-center justify-center">
                  <label className="flex items-center space-x-2">
                     <p className="font-mono">Present:</p>
                     <input
                        type="checkbox"
                        checked={attendance[workerName].present}
                        onChange={() => handleCheckboxChange(workerName)}
                     />
                  </label>

                  {/* Remove button */}
                  <button
                     onClick={() => handleRemoveWorker(workerName)}
                     className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                     Remove
                  </button>
               </div>
            </div>
         ))}
      </>
   );
};
