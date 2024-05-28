'use client'
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import AddAsset from "./AddAsset";

const supUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anonKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
const supabase = createClient(supUrl, anonKey);

const Home = () => {
    const [assets, setAssets] = useState<any[]>([]);
    const [status, setStatus] = useState<string>("All"); // Adding status state

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            let { data, error } = await supabase.from("assets").select();
            if (error) {
                throw error;
            }
            data?.reverse();
            setAssets(data || []);
        } catch (error) {
            console.error("Error fetching assets:", error.message);
        }
    };

    const handleAddAsset = async (newAsset) => {
        try {
            let locationToSet = newAsset.location; // Default location

            // Set location based on selected status
            switch (newAsset.status) {
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
                .eq("name", newAsset.name)
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
                    console.error(
                        "Error deleting asset:",
                        deleteError?.message
                    );
                }
            }

            const { error } = await supabase.from("assets").insert([
                {
                    name: newAsset.name,
                    status: newAsset.status,
                    location: locationToSet,
                    lastUpdated: new Date().toISOString().substring(11, 19),
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

    // Function to filter assets based on status
    const handleStatusFilterChange = async (selectedStatus: string) => {
        try {
            let { data, error } = await supabase
                .from("assets")
                .select();

            if (selectedStatus !== "All") {
                data = await supabase
                    .from("assets")
                    .select()
                    .eq("status", selectedStatus)
                    .then((res) => res.data);
            }

            if (error) {
                throw error;
            }
            setAssets(data || []);
        } catch (error) {
            console.error("Error filtering assets by status:", error.message);
        }
    };

    return (
        <div className="container flex flex-col mx-auto gap-y-10">
            <h1 className="text-3xl font-bold mt-8 mb-4">
                Asset Tracking Dashboard
            </h1>
            <h2 className="text-xl font-semibold">Add Asset</h2>
            <AddAsset onAdd={handleAddAsset} />
            <h2 className="text-xl font-semibold">Asset Info</h2>
            <select
                className="border p-2 mb-2 bg-black text-gray-400"
                value={status}
                onChange={(e) => {
                    setStatus(e.target.value);
                    handleStatusFilterChange(e.target.value);
                }}
            >
                <option value="All">All</option>
                <option value="In Use">In Use</option>
                <option value="Available">Available</option>
                <option value="Maintenance">Maintenance</option>
            </select>
            <div className="grid grid-cols-3 gap-4">
                {assets.length > 0 ? (
                    assets.map((asset, index) => (
                        <div key={index} className="border p-4 rounded-md">
                            <h2 className="text-xl font-semibold">
                                {asset.name}
                            </h2>
                            <p>Status: {asset.status}</p>
                            <p>Location: {asset.location}</p>
                            <p>Last Updated at: {asset.lastUpdated}</p>
                        </div>
                    ))
                ) : (
                    <div>
                        <h2 className="text-2xl">No assets found</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
