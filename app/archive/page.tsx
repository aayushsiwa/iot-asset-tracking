"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

interface ArchivedItem {
    id: number;
    name: string;
    lastUpdated: string;
    createdAt: string;
}

const supUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anonKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
const supabase = createClient(supUrl, anonKey);

const Archive: React.FC = () => {
    const [archivedData, setArchivedData] = useState<ArchivedItem[]>([]);

    useEffect(() => {
        // Fetch archived data from the backend when component mounts
        fetchArchivedData();
    }, []);

    const fetchArchivedData = async () => {
        try {
            const { data, error } = await supabase.from("archive").select();
            if (error) {
                throw error;
            }
            data?.reverse();
            setArchivedData(data || []);
        } catch (error:any) {
            console.error("Error fetching archived data:", error.message);
        }
    };

    return (
        <div className="container flex flex-col mx-auto gap-y-10 justify-center items-center">
            <h1 className="text-3xl font-bold mt-8 mb-4">Archives</h1>
            <div className="">
                <table className="table-fixed w-96 ">
                    <thead >
                        <tr className="flex gap-1">
                            <th className="w-48 border-2 border-gray-400">Name</th>
                            <th className="w-48 border-2 border-gray-400">Archived At</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {archivedData.map((item) => (
                            <tr key={item.name} className="flex justify-center items-center mt-1 gap-1">
                                <td className="flex w-48 justify-center border-2 border-red-900 items-center">{item.name}</td>
                                <td className="flex w-48 justify-center border-2 border-red-900 items-center">{item.createdAt.split("T")[1].substring(0,8)+" "+item.createdAt.split("T")[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Archive;
