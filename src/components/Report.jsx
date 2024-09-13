import { useState, useEffect } from "react";

export const Report = () => {
    const [quantity, setQuantity] = useState(0);
    const [grade, setGrade] = useState("");
    const [carbonContent, setCarbonContent] = useState(0);
    const [rate, setRate] = useState(0);
    const [coalType, setCoalType] = useState("");

    const [reports, setReports] = useState([]);
    const [error, setError] = useState("");

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

    const handleSubmitChange = async (event) => {
        event.preventDefault();
        if (quantity >= 0 && grade && carbonContent >= 0 && rate >= 0 && coalType) {
            const newReport = { quantity, grade, carbonContent, rate, coalType };
            try {
                const response = await fetch("http://localhost:1337/api/reports", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newReport)
                });
                if (response.ok) {
                    const data = await response.json();
                    setReports([...reports, data]);
                    setQuantity(0);
                    setGrade("");
                    setCarbonContent(0);
                    setRate(0);
                    setCoalType("");
                } else {
                    setError("Failed to add report.");
                }
            } catch (err) {
                setError("An error occurred while adding the report.");
            }
        } else {
            alert("Please fill in all required fields.");
        }
    };

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch("http://localhost:1337/api/reports");
                if (response.ok) {
                    const data = await response.json();
                    setReports(data);
                } else {
                    setError("Failed to fetch reports.");
                }
            } catch (err) {
                setError("An error occurred while fetching the reports.");
            }
        };

        fetchReports();
    }, []);

    return (
        <div className="p-6 border-2 border-black w-5/6 m-auto rounded-2xl">
            <h1 className="text-2xl font-bold mb-6">Production Report</h1>
            <form onSubmit={handleSubmitChange} className="space-y-4">
                <div className="space-y-2">
                    <label className="block">
                        <span className="text-gray-700">Quantity:</span>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>
                <div className="space-y-2">
                    <label className="block">
                        <span className="text-gray-700">Grade of Coal:</span>
                        <input
                            type="text"
                            value={grade}
                            onChange={handleGradeChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>
                <div className="space-y-2">
                    <label className="block">
                        <span className="text-gray-700">Carbon Content:</span>
                        <input
                            type="number"
                            value={carbonContent}
                            onChange={handleCarbonContentChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>
                <div className="space-y-2">
                    <label className="block">
                        <span className="text-gray-700">Rate:</span>
                        <input
                            type="number"
                            value={rate}
                            onChange={handleRateChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>
                <fieldset className="space-y-2">
                    <legend className="text-gray-700 font-semibold">Coal Type:</legend>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="coalType"
                                value="coking"
                                checked={coalType === "coking"}
                                onChange={handleCoalTypeChange}
                                className="form-radio text-blue-600"
                            />
                            <span className="ml-2">Coking</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="coalType"
                                value="nonCoking"
                                checked={coalType === "nonCoking"}
                                onChange={handleCoalTypeChange}
                                className="form-radio text-blue-600"
                            />
                            <span className="ml-2">Non-Coking</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="coalType"
                                value="semiCoking"
                                checked={coalType === "semiCoking"}
                                onChange={handleCoalTypeChange}
                                className="form-radio text-blue-600"
                            />
                            <span className="ml-2">Semi-Coking</span>
                        </label>
                    </div>
                </fieldset>
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>

            {error && <p className="mt-4 text-red-600">{error}</p>}

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Existing Reports:</h2>
                <ul>
                    {reports.map((report) => (
                        <li key={report._id} className="mb-2 p-2 border border-gray-300 rounded">
                            <p><strong>Quantity:</strong> {report.quantity}</p>
                            <p><strong>Grade of Coal:</strong> {report.grade}</p>
                            <p><strong>Carbon Content:</strong> {report.carbonContent}</p>
                            <p><strong>Rate:</strong> {report.rate}</p>
                            <p><strong>Coal Type:</strong> {report.coalType}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
