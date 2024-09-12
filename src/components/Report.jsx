import { useState } from "react"


export const Report = () => {

   const [quantity, setQuantity] = useState(0);
   const [carbonContent, setCarbonContent] = useState(0);
   const [rate, setRate] = useState(0);

   const [coalTypes, setCoalTypes] = useState({
      coking: false,
      nonCoking: false,
      semiCoking: false
   });

   const handleSubmitChange = (event) => {
      event.preventDefault();
      console.log({ quantity, carbonContent, rate, coalTypes });
   }

   const handleCoalTypeChange = (event) => {
      const { name, checked } = event.target;
      setCoalTypes(prevCoalTypes => ({
         ...prevCoalTypes,
         [name]: checked
      }));
   };

   const handleQuantityChange = (event) => {
      setQuantity(Number(event.target.value));
   };

   const handleCarbonContentChange = (event) => {
      setCarbonContent(Number(event.target.value));
   };

   const handleRateChange = (event) => {
      setRate(Number(event.target.value));
   };

   return (
      <div>
         <h1>Production Report: </h1>

         <form onSubmit={handleSubmitChange}>

            <div>
               <label>
                  Quantity:
                  <input
                     type="number"
                     value={quantity}
                     onChange={handleQuantityChange}
                  />
               </label>
            </div>

            <div>
               <label>
                  Carbon Content:
                  <input
                     type="number"
                     value={carbonContent}
                     onChange={handleCarbonContentChange}
                  />
               </label>
            </div>

            <div>
               <label>
                  Rate:
                  <input
                     type="number"
                     value={rate}
                     onChange={handleRateChange}
                  />
               </label>
            </div>

            <div>
               <fieldset>
                  <legend>Coal Type:</legend>
                  <label>
                     <input
                        type="checkbox"
                        name="coking"
                        checked={coalTypes.coking}
                        onChange={handleCoalTypeChange}
                     />
                     Coking
                  </label>
                  <br />
                  <label>
                     <input
                        type="checkbox"
                        name="nonCoking"
                        checked={coalTypes.nonCoking}
                        onChange={handleCoalTypeChange}
                     />
                     Non-Coking
                  </label>
                  <br />
                  <label>
                     <input
                        type="checkbox"
                        name="semiCoking"
                        checked={coalTypes.semiCoking}
                        onChange={handleCoalTypeChange}
                     />
                     Semi-Coking
                  </label>
               </fieldset>
            </div>
            <button type="submit">Submit</button>
         </form>



      </div>
   )
}