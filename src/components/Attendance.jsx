import { useState, useEffect } from "react";


export const Attendance = ({ inde }) => {
   const [attendance, setAttendance] = useState(() => {
      const storedAttendance = localStorage.getItem(`attendanceRecord${inde}`);
      return storedAttendance ? JSON.parse(storedAttendance) : {};
   });

   const [presentCount, setPresentCount] = useState(0);
   const [newWorker, setNewWorker] = useState({
      name: "",
      phoneNumber: ""
   });

   const [isFormVisible, setIsFormVisible] = useState(false); // State for form visibility

   useEffect(() => {
      const count = Object.values(attendance).filter(worker => worker.present).length;
      setPresentCount(count);
      localStorage.setItem(`attendanceRecord${inde}`, JSON.stringify(attendance)); // Save to local storage
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

   const handleAddWorker = async (e) => {
      e.preventDefault();
      if (newWorker.name && newWorker.phoneNumber) {
         // Send data to the backend
         try {
            const response = await fetch('http://localhost:1337/api/workers', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(newWorker)
            });

            if (response.ok) {
               const worker = await response.json();
               setAttendance((prevState) => ({
                  ...prevState,
                  [worker.name]: { present: false, phoneNumber: worker.phoneNumber }
               }));
               setNewWorker({ name: "", phoneNumber: "" }); // Clear form after adding
               setIsFormVisible(false); // Hide form after adding
            } else {
               console.error('Failed to add worker.');
            }
         } catch (error) {
            console.error('Error:', error);
         }
      }
   };

   return (
      <>
         <h1 className="flex text-3xl font-serif w-full justify-center items-center font-bold mb-3">Worker Details:</h1>
         <p className="text-center text-xl">Total Workers Present: {presentCount}</p>

         {/* Create New Worker button */}
         <button 
            onClick={() => setIsFormVisible(!isFormVisible)} 
            className="flex items-center justify-center mb-6 bg-green-500 text-white px-4 py-2 rounded m-auto mt-5">
           Create New
         </button>

         {/* Form to add new worker, visible only when isFormVisible is true */}
         {isFormVisible && (
            <form onSubmit={handleAddWorker} className="flex flex-col items-center justify-center mb-10 border-2 border-black rounded-2xl w-64 h-52 m-auto">
               <input
                  type="text"
                  name="name"
                  value={newWorker.name}
                  placeholder="Worker Name"
                  onChange={handleInputChange}
                  className="border-2 mb-4 p-2 border-black"
                  required
               />
               <input
                  type="text"
                  name="phoneNumber"
                  value={newWorker.phoneNumber}
                  placeholder="Phone Number"
                  onChange={handleInputChange}
                  className="border-2 mb-4 p-2 border-black"
                  required
               />
               <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Worker</button>
            </form>
         )}

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
