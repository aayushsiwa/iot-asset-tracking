'use client'
import React, { useState } from "react";
import Toast from "../components/Toast";

const AddAsset = ({ onAdd, inventory }: { onAdd: (data: any) => void; inventory: any[] }) => {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [location, setLocation] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleAddAsset = () => {
        if (
            !name ||
            !status ||
            (status !== "Available" && status !== "Maintenance" && !location)
        ) {
            // Display a toast message if any required field is empty
            setShowToast(true);
            setTimeout(() => setShowToast(false), 1000); // Hide the toast after 3 seconds
            return; // Don't proceed with asset addition
        }
        onAdd({ name, status, location });
        setName("");
        setStatus("");
        setLocation("");
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-center gap-x-2 w-full">
                <select
                    required
                    className="border p-2 mb-2 bg-black text-gray-400 w-[30%] md:w-[33%]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                    <option value="">Select Name</option>
                    {inventory.map((item) => (
                        <option key={item.name} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <select
                    required
                    className="border p-2 mb-2 bg-black text-gray-400 w-[30%] md:w-[33%]"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Select Status</option>
                    <option value="In Use">In Use</option>
                    <option value="Available">Available</option>
                    <option value="Maintenance">Maintenance</option>
                </select>
                <select
                    required
                    className="border p-2 mb-2 bg-black text-gray-400 w-[30%] md:w-[33%]"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={
                        status === "Maintenance" || status === "Available"
                    }
                >
                    <option value="">
                        {status === "Maintenance"
                            ? "Workshop"
                            : status === "Available"
                            ? "Store Room"
                            : "Select Location"}
                    </option>
                    <option value="Main Office">Main Office</option>
                    <option value="Storage Room">Storage Room</option>
                    <option value="Maintenance">Maintenance</option>
                </select>
            </div>
            <div className="flex justify-center items-center">
                <button
                    className="bg-black border-2 text-white p-2 rounded hover:bg-zinc-700 w-96 md:w-full"
                    onClick={handleAddAsset}
                >
                    Add Asset
                </button>
            </div>
            {showToast && (
                <Toast
                    message="Please fill in all required fields."
                    bgColor="bg-red-500"
                    textColor="text-white"
                    duration={1000}
                />
            )}
        </div>
    );
};

export default AddAsset;
