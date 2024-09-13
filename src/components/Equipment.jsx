import { useState, useEffect } from "react";

export const Equipment = () => {
    const [tools, setTools] = useState([]);
    const [newTool, setNewTool] = useState({
        name: "",
        status: "",
        quantity: 0,
        id: "",
        review: ""
    });
    const [error, setError] = useState(null);

    // Fetch existing tools when the component mounts
    useEffect(() => {
        fetch('http://localhost:1337/api/tools')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setTools(data))
            .catch(err => setError("Failed to fetch tools."));
    }, []);

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
            fetch('http://localhost:1337/api/tools', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTool),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setTools([...tools, data]);
                    setNewTool({
                        name: "",
                        status: "",
                        quantity: 0,
                        id: "",
                        review: ""
                    });
                    setError(null); // Clear any previous errors
                })
                .catch(err => setError("Failed to add tool."));
        } else {
            setError("Please fill in the name and ID of the tool.");
        }
    };

    return (
        <div className="p-6 border-2 border-black w-5/6 m-auto rounded-2xl">
            <h1 className="text-2xl font-bold mb-6">Equipment Report:</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleAddToolSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Add New Tool:</h2>

                <div className="space-y-2">
                    <label className="block">
                        <span className="text-gray-700">Name:</span>
                        <input
                            type="text"
                            value={newTool.name}
                            onChange={(e) => handleNewToolChange('name', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>

                <div className="space-y-2">
                    <label className="block">
                        <span className="text-gray-700">Status:</span>
                        <input
                            type="text"
                            value={newTool.status}
                            onChange={(e) => handleNewToolChange('status', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>

                <div className="space-y-2">
                    <label className="block">
                        <span className="text-gray-700">Quantity:</span>
                        <input
                            type="number"
                            value={newTool.quantity}
                            onChange={(e) => handleNewToolChange('quantity', Number(e.target.value))}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>

                <div className="space-y-2">
                    <label className="block">
                        <span className="text-gray-700">ID:</span>
                        <input
                            type="text"
                            value={newTool.id}
                            onChange={(e) => handleNewToolChange('id', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>

                <div className="space-y-2">
                    <label className="block">
                        <span className="text-gray-700">Review:</span>
                        <textarea
                            value={newTool.review}
                            onChange={(e) => handleNewToolChange('review', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Tool
                </button>
            </form>

            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Existing Tools:</h2>
                {tools.length === 0 ? (
                    <p className="text-gray-600">No tools added yet.</p>
                ) : (
                    <ul className="list-disc pl-5 space-y-2">
                        {tools.map((tool, index) => (
                            <li key={index} className="text-gray-800">
                                {tool.name} - {tool.status} - {tool.quantity} - {tool.id} - {tool.review}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
