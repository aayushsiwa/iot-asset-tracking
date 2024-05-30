"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/helper/supabaseClient";
import { Rows2 } from "../lib/helper/rows";

interface ArchivedItem {
    id: number;
    name: string;
    lastUpdated: string;
    createdAt: string;
}

const Archive: React.FC = () => {
    const [archivedData, setArchivedData] = useState<ArchivedItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fetch archived data from the backend when component mounts
        fetchArchivedData();
    }, []);

    const fetchArchivedData = async () => {
        setLoading(true);

        try {
            const { data, error } = await supabase.from("archive").select();
            if (error) {
                throw error;
            }
            data?.reverse();
            console.log(data);
            setArchivedData(data || []);
        } catch (error: any) {
            console.error("Error fetching archived data:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto font-mono">
            <h1 className="text-3xl font-bold mt-8 mb-16">Inventory</h1>
            <div className="flex justify-center">
                <table className="table-fixed w-full border-collapse border-white border-b-2">
                    <thead className="sticky top-0 z-10">
                        <tr className="flex bg-black text-white border-b-2 border-slate-700">
                            <th className="w-1/2 p-2">Name</th>
                            <th className="w-1/2 p-2">Status Changed At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <Rows2 />
                        ) : archivedData.length > 0 ? (
                            archivedData.map((item) => (
                                <tr
                                    key={item.name}
                                    className="flex justify-center items-center p-2 border-b-2 border-slate-700"
                                >
                                    <td className="w-1/2 flex justify-center items-center">
                                        {item.name}
                                    </td>
                                    <td className="w-1/2 flex justify-center items-center">
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <div className="flex justify-center items-center">
                                <h2 className="text-xl ms-[5vw] mt-[7vh]">
                                    No Archives found
                                </h2>
                            </div>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Archive;
