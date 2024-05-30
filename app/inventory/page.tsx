"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/helper/supabaseClient";
import "../lib/helper/supabaseClient";
import Rows from "../lib/helper/rows";
import Toast from "../../components/Toast";

function Inventory() {
    const [inventory, setInventory] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        setLoading(true);
        try {
            let { data, error } = await supabase.from("inventory").select();
            if (error) {
                throw error;
            }
            data?.reverse();
            setInventory(data || []);
        } catch (error: any) {
            console.error("Error fetching inventory:", error.message);
        } finally {
            setLoading(false); // Set loading to false after fetching assets
        }
    };

    return (
        <div className="container mx-auto font-mono">
            <h1 className="text-3xl font-bold mt-8 mb-16">Inventory</h1>
            <div className="flex justify-center">
                <table className="table-fixed w-full border-collapse border-white border-b-2">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-black text-white border-b-2 border-slate-700">
                            <th className="p-2">Id</th>
                            <th className="p-2">Item Added At</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Type</th>
                            <th className="p-2">Model</th>
                            <th className="p-2">Current Status</th>
                            <th className="p-2">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <Rows />
                        ) : inventory.length > 0 ? (
                            inventory.map((item) => (
                                <tr
                                    key={item.id}
                                    className=" border-b-2 border-slate-700"
                                >
                                    <td className="p-2">{item.id}</td>
                                    <td className="p-2">
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleString()}
                                    </td>
                                    <td className="p-2">{item.name}</td>
                                    <td className="p-2">{item.type}</td>
                                    <td className="p-2">{item.model}</td>
                                    <td className="p-2">{item.status}</td>
                                    <td className="p-2">{item.location}</td>
                                </tr>
                            ))
                        ) : (
                            <Toast
                                message="No Inventory found"
                                bgColor="bg-red-500"
                                textColor="text-white"
                                duration={10000}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Inventory;
