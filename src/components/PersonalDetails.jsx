import details from "../data/details.json"

export const PersonalDetails = () => {
   return (
      <>
         <div>
            <h1>User Details:</h1>
            {details.map((user, index) => (
               <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                  <h2>{user.firstName} {user.lastName}</h2>
                  <p>Email: {user.email}</p>
                  <p>Contact Number: {user.contactNumber}</p>
               </div>
            ))}
         </div>

      </>
   );
};

