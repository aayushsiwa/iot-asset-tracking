"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anonKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
const supabase = createClient(supUrl, anonKey);

const Home = () => {
    const [assets, setAssets] = useState<any[]>([]);
    const [name, setName] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            const { data, error } = await supabase.from("assets").select();
            if (error) {
                throw error;
            }
			data?.reverse();
            setAssets(data || []);
        } catch (error) {
            console.error("Error fetching assets:", error.message);
        }
    };

    const handleAddAsset = async () => {
        try {
            let locationToSet = location; // Default location

            // Set location based on selected status
            switch (status) {
                case "Maintenance":
                    locationToSet = "Workshop";
                    break;
                case "Available":
                    locationToSet = "Store Room";
                    break;
                default:
                    break;
            }

            const { data: existingAsset, error: fetchError } = await supabase
                .from("assets")
                .select()
                .eq("name", name)
                .single();

            if (fetchError) {
                console.error("Error fetching asset:", fetchError?.message);
            }

            if (existingAsset) {
                // Delete the existing asset
                const { error: deleteError } = await supabase
                    .from("assets")
                    .delete()
                    .eq("assetId", existingAsset.assetId);

                if (deleteError) {
                    // throw deleteError;
					console.error("Error deleting asset:", deleteError?.message);
                }
            }

            const { error } = await supabase.from("assets").insert([
                {
                    name,
                    status,
                    location: locationToSet,
                    lastUpdated: new Date().toISOString().substring(11,19) 
					// + " " + new Date().toISOString().substring(0,10),
                },
            ]);
            if (error) {
                throw error;
            }
            fetchAssets();
        } catch (error) {
            console.error("Error adding asset:", error.message);
        }
    };

    return (
        <div className="container flex flex-col mx-auto gap-y-10">
            <h1 className="text-3xl font-bold mt-8 mb-4">
                Asset Tracking Dashboard
            </h1>
            <h2 className="text-xl font-semibold">Add Asset</h2>
            <div className="flex gap-2">
                <input
                    type="text"
                    className="border p-2 mb-2 bg-black"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <select
                    className="border p-2 mb-2 bg-black text-gray-400"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Select Status</option>
                    <option value="In Use">In Use</option>
                    <option value="Available">Available</option>
                    <option value="Maintenance">Maintenance</option>
                </select>
                <select
                    className="border p-2 mb-2 bg-black text-gray-400"
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
                <button
                    className="bg-black border-2 text-white px-4 rounded hover:bg-zinc-700"
                    onClick={handleAddAsset}
                >
                    Add Asset
                </button>
            </div>
			<h2 className="text-xl font-semibold">Asset Info</h2>
            <div className="grid grid-cols-3 gap-4">
                {assets.map((asset, index) => (
                    <div key={index} className="border p-4 rounded-md">
                        <h2 className="text-xl font-semibold">{asset.name}</h2>
                        <p>Status: {asset.status}</p>
                        <p>Location: {asset.location}</p>
                        <p>Last Updated at: {asset.lastUpdated}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
