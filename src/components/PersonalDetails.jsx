import { useState, useEffect } from "react";

export const PersonalDetails = () => {
    const [details, setDetails] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch("http://localhost:1337/api/users");
                if (response.ok) {
                    const data = await response.json();
                    setDetails(data);
                } else {
                    setError("Failed to fetch user details.");
                }
            } catch (err) {
                setError("An error occurred while fetching user details.");
            }
        };

        fetchDetails();
    }, []);

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <h1 className="text-3xl font-bold font-serif mt-5">User Details:</h1>
            {error && <p className="text-red-600">{error}</p>}
            {details.length === 0 ? (
                <p className="text-md font-semibold text-gray-600">No user details available.</p>
            ) : (
                details.map((user, index) => (
                    <div key={index} className="border-2 w-4/6 m-auto border-black rounded-2xl p-5">
                        <h2 className="text-2xl font-bold font-serif">{user.name}</h2>
                        <p className="text-md font-semibold text-gray-600">Email: {user.email}</p>
                        {/* <p className="text-md font-semibold text-gray-600">Contact Number: {user.contactNumber}</p> */}
                    </div>
                ))
            )}
        </div>
    );
};
