import { useState } from "react";

export const Equipment = () => {
   const [tools, setTools] = useState([
      {
         name: "",
         status: "",
         quantity: 0,
         id: "",
         review: ""
      }
   ]);

   const [newTool, setNewTool] = useState({
      name: "",
      status: "",
      quantity: 0,
      id: "",
      review: ""
   });

   const handleInputChange = (index, field, value) => {
      const updatedTools = [...tools];
      updatedTools[index] = { ...updatedTools[index], [field]: value };
      setTools(updatedTools);
   };

   const handleNewToolChange = (field, value) => {
      setNewTool({ ...newTool, [field]: value });
   };


   const handleAddToolSubmit = (event) => {
      event.preventDefault();
      if (newTool.name && newTool.id) {
         setTools([...tools, newTool]);
         setNewTool({
            name: "",
            status: "",
            quantity: 0,
            id: "",
            review: ""
         });
      } else {
         alert("Please fill in the name and ID of the tool.");
      }
   };

   return (
      <div>
         <br />
         <br />
         <h1>Equipment Report: </h1>

         <form onSubmit={handleAddToolSubmit}>
            <h2>Add New Tool:</h2>
            <div>
               <label>
                  Name:
                  <input
                     type="text"
                     value={newTool.name}
                     onChange={(e) => handleNewToolChange('name', e.target.value)}
                  />
               </label>
            </div>
            <div>
               <label>
                  Status:
                  <input
                     type="text"
                     value={newTool.status}
                     onChange={(e) => handleNewToolChange('status', e.target.value)}
                  />
               </label>
            </div>
            <div>
               <label>
                  Quantity:
                  <input
                     type="number"
                     value={newTool.quantity}
                     onChange={(e) => handleNewToolChange('quantity', Number(e.target.value))}
                  />
               </label>
            </div>
            <div>
               <label>
                  ID:
                  <input
                     type="text"
                     value={newTool.id}
                     onChange={(e) => handleNewToolChange('id', e.target.value)}
                  />
               </label>
            </div>
            <div>
               <label>
                  Review:
                  <textarea
                     value={newTool.review}
                     onChange={(e) => handleNewToolChange('review', e.target.value)}
                  />
               </label>
            </div>
            <button type="submit">Add Tool</button>
         </form>
      </div>
   );
};

