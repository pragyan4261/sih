import { useState } from "react";

export const Report = () => {
   const [quantity, setQuantity] = useState(0);
   const [grade, setGrade] = useState("");
   const [carbonContent, setCarbonContent] = useState(0);
   const [rate, setRate] = useState(0);

   const [coalType, setCoalType] = useState("");

   const handleQuantityChange = (event) => {
      setQuantity(Number(event.target.value));
   };

   const handleGradeChange = (event) => {
      setGrade(event.target.value);
   };

   const handleCarbonContentChange = (event) => {
      setCarbonContent(Number(event.target.value));
   };

   const handleRateChange = (event) => {
      setRate(Number(event.target.value));
   };

   const handleCoalTypeChange = (event) => {
      setCoalType(event.target.value);
   };

   const handleSubmitChange = (event) => {
      event.preventDefault();
      console.log({
         quantity,
         grade,
         carbonContent,
         rate,
         coalType
      });
   };

   return (
      <div>
         <h1>Production Report</h1>
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
                  Grade of Coal:
                  <input
                     type="text"
                     value={grade}
                     onChange={handleGradeChange}
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
               <legend>Coal Type:</legend>
               <label>
                  <input
                     type="radio"
                     name="coalType"
                     value="coking"
                     checked={coalType === "coking"}
                     onChange={handleCoalTypeChange}
                  />
                  Coking
               </label>
               <br />
               <label>
                  <input
                     type="radio"
                     name="coalType"
                     value="nonCoking"
                     checked={coalType === "nonCoking"}
                     onChange={handleCoalTypeChange}
                  />
                  Non-Coking
               </label>
               <br />
               <label>
                  <input
                     type="radio"
                     name="coalType"
                     value="semiCoking"
                     checked={coalType === "semiCoking"}
                     onChange={handleCoalTypeChange}
                  />
                  Semi-Coking
               </label>
            </div>
            <button type="submit">Submit</button>
         </form>
      </div>
   );
};
