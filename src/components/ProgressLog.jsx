import { useState } from "react";

export const ProgressLog = () => {
   const [date, setDate] = useState("");
   const [siteLocation, setSiteLocation] = useState("");
   const [quantityExtracted, setQuantityExtracted] = useState(0);
   const [rateOfProduction, setRateOfProduction] = useState(0);
   const [creator, setCreator] = useState("");
   const [lastUpdated, setLastUpdated] = useState("");

   const handleChange = (setter) => (e) => {
      setter(e.target.value);
   };

   const handleNumericalChange = (setter) => (e) => {
      setter(Number(e.target.value));
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      if (date && siteLocation && quantityExtracted >= 0 && rateOfProduction >= 0) {
         const newLog = { date, siteLocation, quantityExtracted, rateOfProduction, creator, lastUpdated };
         setDate("");
         setSiteLocation("");
         setQuantityExtracted(0);
         setRateOfProduction(0);
         setCreator("");
         setLastUpdated("");
      } else {
         alert("Please fill in all required fields.");
      }
   };

   return (
      <div>
         <br />
         <br />
         <h1>Progress Log</h1>

         <form onSubmit={handleSubmit}>
            <div>
               <label>
                  Date:
                  <input
                     type="date"
                     value={date}
                     onChange={handleChange(setDate)}
                     required
                  />
               </label>
            </div>
            <div>
               <label>
                  Site Location:
                  <input
                     type="text"
                     value={siteLocation}
                     onChange={handleChange(setSiteLocation)}
                     required
                  />
               </label>
            </div>
            <div>
               <label>
                  Quantity Extracted:
                  <input
                     type="number"
                     value={quantityExtracted}
                     onChange={handleNumericalChange(quantityExtracted)}
                     min="0"
                     required
                  />
               </label>
            </div>
            <div>
               <label>
                  Rate of Production:
                  <input
                     type="number"
                     value={rateOfProduction}
                     onChange={handleNumericalChange(rateOfProduction)}
                     min="0"
                     required
                  />
               </label>
            </div>
            <div>
               <label>
                  Creator:
                  <input
                     type="text"
                     value={creator}
                     onChange={handleChange(setCreator)}
                  />
               </label>
            </div>
            <div>
               <label>
                  Last Updated:
                  <input
                     type="datetime-local"
                     value={lastUpdated}
                     onChange={handleChange(setLastUpdated)}
                  />
               </label>
            </div>
            <button type="submit">Submit Log</button>
         </form>
      </div>
   );
};

