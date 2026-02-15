"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/utils/supabaseClient";
import { Location } from "@/types/Location";

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  async function fetchLocations() {
    setLoading(true);

    const { data } = await supabase
      .schema("iot")
      .from("locations")
      .select("*")
      .order("createdAtUTC", { ascending: false });

    if (data) setLocations(data);

    setLoading(false);
  }

  async function createLocation() {
    if (!name || !code) return;

    await supabase
      .schema("iot")
      .from("locations")
      .insert([
        {
          name,
          code: code.toUpperCase(),
        },
      ]);

    setName("");
    setCode("");
    fetchLocations();
  }

  async function deleteLocation(id: string) {
    await supabase.schema("iot").from("locations").delete().eq("ID", id);
    fetchLocations();
  }

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="container mx-auto font-mono py-20 px-6 text-black dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Locations</h1>

      {/* Create Location Form */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-4">
        <input
          className="p-2 rounded border bg-transparent flex-1"
          placeholder="Location Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="p-2 rounded border bg-transparent w-96"
          placeholder="Code (4 letters)"
          value={code}
          maxLength={4}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
        />

        <button
          onClick={createLocation}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {/* Locations Table */}
      <div className="overflow-x-auto">
        <table className="table-fixed w-full border-collapse border-b-2 border-slate-700">
          <thead>
            <tr className="bg-black text-white border-b-2 border-slate-700">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  Loading locations...
                </td>
              </tr>
            ) : locations.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-red-500">
                  No locations found
                </td>
              </tr>
            ) : (
              locations.map((loc) => (
                <tr
                  key={loc.ID}
                  className="border-b border-slate-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
                >
                  <td className="p-3">{loc.ID.slice(0, 8)}</td>

                  <td className="p-3">
                    {new Date(loc.createdAtUTC).toLocaleString()}
                  </td>

                  <td className="p-3">{loc.name}</td>

                  <td className="p-3 font-semibold">{loc.code}</td>

                  <td className="p-3">
                    <button
                      onClick={() => deleteLocation(loc.ID)}
                      className="text-red-500 hover:text-red-400 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
