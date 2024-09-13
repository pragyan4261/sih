import { useState, useEffect } from "react";

export const ProgressLog = () => {
    const [date, setDate] = useState("");
    const [siteLocation, setSiteLocation] = useState("");
    const [quantityExtracted, setQuantityExtracted] = useState(0);
    const [rateOfProduction, setRateOfProduction] = useState(0);
    const [creator, setCreator] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState("");

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleNumericalChange = (setter) => (e) => {
        setter(Number(e.target.value));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (date && siteLocation && quantityExtracted >= 0 && rateOfProduction >= 0) {
            const newLog = { date, siteLocation, quantityExtracted, rateOfProduction, creator, lastUpdated };
            try {
                const response = await fetch("http://localhost:1337/api/progress-logs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newLog)
                });
                if (response.ok) {
                    const data = await response.json();
                    setLogs([...logs, data]);
                    setDate("");
                    setSiteLocation("");
                    setQuantityExtracted(0);
                    setRateOfProduction(0);
                    setCreator("");
                    setLastUpdated("");
                } else {
                    setError("Failed to add progress log.");
                }
            } catch (err) {
                setError("An error occurred while adding the progress log.");
            }
        } else {
            alert("Please fill in all required fields.");
        }
    };

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch("http://localhost:1337/api/progress-logs");
                if (response.ok) {
                    const data = await response.json();
                    setLogs(data);
                } else {
                    setError("Failed to fetch progress logs.");
                }
            } catch (err) {
                setError("An error occurred while fetching the progress logs.");
            }
        };

        fetchLogs();
    }, []);

    return (
        <div className="p-6 border-2 border-black w-5/6 m-auto rounded-2xl">
            <h1 className="text-2xl font-bold mb-6">Progress Log</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="block">
                        <span className="text-gray-700">Date:</span>
                        <input
                            type="date"
                            value={date}
                            onChange={handleChange(setDate)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>

                <div className="space-y-2">
                    <label className="block">
                        <span className="text-gray-700">Site Location:</span>
                        <input
                            type="text"
                            value={siteLocation}
                            onChange={handleChange(setSiteLocation)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>

                <div className="space-y-2">
                    <label className="block">
                        <span className="text-gray-700">Quantity Extracted:</span>
                        <input
                            type="number"
                            value={quantityExtracted}
                            onChange={handleNumericalChange(setQuantityExtracted)}
                            min="0"
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>

                <div className="space-y-2">
                    <label className="block">
                        <span className="text-gray-700">Rate of Production:</span>
                        <input
                            type="number"
                            value={rateOfProduction}
                            onChange={handleNumericalChange(setRateOfProduction)}
                            min="0"
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>

                <div className="space-y-2">
                    <label className="block">
                        <span className="text-gray-700">Creator:</span>
                        <input
                            type="text"
                            value={creator}
                            onChange={handleChange(setCreator)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>

                <div className="space-y-2">
                    <label className="block">
                        <span className="text-gray-700">Last Updated:</span>
                        <input
                            type="datetime-local"
                            value={lastUpdated}
                            onChange={handleChange(setLastUpdated)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Submit Log
                </button>
            </form>

            {error && <p className="mt-4 text-red-600">{error}</p>}

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Logs:</h2>
                <ul>
                    {logs.map((log) => (
                        <li key={log._id} className="mb-2 p-2 border border-gray-300 rounded">
                            <p><strong>Date:</strong> {new Date(log.date).toLocaleDateString()}</p>
                            <p><strong>Site Location:</strong> {log.siteLocation}</p>
                            <p><strong>Quantity Extracted:</strong> {log.quantityExtracted}</p>
                            <p><strong>Rate of Production:</strong> {log.rateOfProduction}</p>
                            <p><strong>Creator:</strong> {log.creator}</p>
                            <p><strong>Last Updated:</strong> {new Date(log.lastUpdated).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
