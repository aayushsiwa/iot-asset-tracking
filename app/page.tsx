"use client";
import React, { useEffect, useState } from "react";
import AddAsset from "./AddAsset";
import { supabase } from "./lib/helper/supabaseClient";

const Home = () => {
    const [assets, setAssets] = useState<any[]>([]);
    const [status, setStatus] = useState<string>("All");
    const [loading, setLoading] = useState<boolean>(true);
    const [inventory, setInventory] = useState<any[]>([]); // State to store inventory data

    useEffect(() => {
        fetchAssets();
        fetchInventory(); // Fetch inventory data
    }, []);

    const fetchAssets = async () => {
        setLoading(true);
        try {
            let { data, error } = await supabase.from("assets").select();
            if (error) {
                throw error;
            }
            data?.reverse();
            setAssets(data || []);
        } catch (error: any) {
            console.error("Error fetching assets:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchInventory = async () => {
        try {
            let { data, error } = await supabase.from("inventory").select();
            if (error) {
                throw error;
            }
            data?.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
            setInventory(data || []);
        } catch (error: any) {
            console.error("Error fetching inventory:", error.message);
        }
    };

    const handleAddAsset = async (newAsset: {
        location: any;
        status: any;
        name: any;
    }) => {
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
                // Move the existing asset to the archive
                const { error: moveError } = await supabase
                    .from("archive")
                    .insert([
                        {
                            name: existingAsset.name,
                            status: existingAsset.status,
                            location: existingAsset.location,
                            lastUpdated: existingAsset.lastUpdated,
                        },
                    ]);

                if (moveError) {
                    console.error("Error archiving asset:", moveError?.message);
                }

                // Delete the existing asset from the assets table
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

            // Add the new asset to the assets table
            const { error } = await supabase.from("assets").insert([
                {
                    name: newAsset.name,
                    status: newAsset.status,
                    location: locationToSet,
                    lastUpdated:
                        new Date().toISOString().substring(11, 19) +
                        " " +
                        new Date().toISOString().substring(0, 10),
                },
            ]);
            if (error) {
                throw error;
            }
            fetchAssets();
        } catch (error: any) {
            console.error("Error adding asset:", error.message);
        }
    };

    // Function to filter assets based on status
    const handleStatusFilterChange = async (selectedStatus: string) => {
        setLoading(true);
        try {
            let { data, error } = await supabase.from("assets").select();

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
        } catch (error: any) {
            console.error("Error filtering assets by status:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container flex flex-col mx-auto gap-y-10 justify-center lg:justify-normal items-center lg:items-stretch">
            <h1 className="text-3xl font-bold mt-8 mb-4">
                Asset Tracking Dashboard
            </h1>
            <h2 className="text-xl font-semibold">Add Asset</h2>
            <AddAsset onAdd={handleAddAsset} inventory={inventory} />{" "}
            {/* Pass inventory data as props */}
            <h2 className="text-xl font-semibold">Asset Info</h2>
            <select
                className="border p-2 mb-2 bg-black text-gray-400 w-96 md:w-full"
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
            <div className="grid grid-cols-2 gap-4 px-2 md:grid-cols-4 font-mono">
                {loading ? (
                    // Display "Loading" while fetching assets
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                        <div className="border p-4 rounded-2xl blink">
                            <div className="blur-md">
                                <h2 className="text-xl font-semibold">
                                    Loading
                                </h2>
                                <p>Status: Loading</p>
                                <p>Location: Loading</p>
                                <p>Last Updated at:06:22:22 2024-05-28</p>
                            </div>
                        </div>
                    </div>
                ) : assets.length > 0 ? (
                    // Display assets if available
                    assets.map((asset, index) => (
                        <div key={index} className="border p-4 rounded-2xl">
                            <h2 className="text-xl font-semibold">
                                {asset.name}
                            </h2>
                            <p>Status: {asset.status}</p>
                            <p>Location: {asset.location}</p>
                            <p>Last Updated at:{asset.lastUpdated}</p>
                        </div>
                    ))
                ) : (
                    // Display "No assets" if no assets available
                    <div className="border rounded-2xl lg:h-[18vh] h-[25vh]">
                        <h2 className="text-xl ms-[5vw] mt-[7vh]">
                            No assets found
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
