import { useState, useEffect } from "react";

export const BlastingLog = () => {
    const [blastingLogs, setBlastingLogs] = useState([]);
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState("");
    const [remarks, setRemarks] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch existing blasting logs when the component mounts
        fetch('http://localhost:1337/api/blasting-logs')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setBlastingLogs(data))
            .catch(err => setError("Failed to fetch blasting logs."));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newLog = { date, location, quantity, type, remarks };

        console.log('Submitting new log:', newLog);  // Debugging log

        fetch('http://localhost:1337/api/blasting-logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLog),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Log added:', data);  // Debugging log
                setBlastingLogs([...blastingLogs, data]);
                // Clear form fields
                setDate("");
                setLocation("");
                setQuantity(0);
                setType("");
                setRemarks("");
            })
            .catch(err => setError("Failed to add blasting log."));
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg w-5/6">
            <h1 className="text-2xl font-bold mb-4">Blasting Log</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-2">
                    <label className="font-medium">
                        Date:
                        <input
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </label>
                    <label className="font-medium">
                        Location:
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </label>
                    <label className="font-medium">
                        Quantity:
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            min="0"
                            required
                        />
                    </label>
                    <label className="font-medium">
                        Type:
                        <input
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </label>
                    <label className="font-medium">
                        Remarks:
                        <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit Log</button>
            </form>
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Existing Logs:</h2>
                {blastingLogs.length === 0 ? (
                    <p className="text-gray-600">No blasting logs found.</p>
                ) : (
                    <ul className="list-disc pl-5 space-y-2">
                        {blastingLogs.map(log => (
                            <li key={log._id} className="text-gray-800">
                                {log.date} - {log.location} - {log.quantity} - {log.type} - {log.remarks}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
