"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/utils/supabaseClient";
import { Asset } from "@/types/Assets";
import { Location } from "@/types/Location";
import { getStatusStyle } from "@/lib/utils/assetStatus";

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [status, setStatus] = useState<"online" | "offline">("offline");
  const [locationId, setLocationId] = useState("");

  async function fetchAssets() {
    setLoading(true);
    const { data } = await supabase
      .schema("iot")
      .from("assets")
      .select("*, locations(name)")
      .order("createdAtUTC", { ascending: false });

    if (data) setAssets(data);
    setLoading(false);
  }

  async function fetchLocations() {
    const { data } = await supabase.schema("iot").from("locations").select("*");

    if (data) setLocations(data);
  }

  async function createAsset() {
    if (!name || !locationId) return;

    await supabase
      .schema("iot")
      .from("assets")
      .insert([
        {
          name,
          status,
          locationID: locationId,
        },
      ]);

    setName("");
    setLocationId("");
    fetchAssets();
  }

  async function deleteAsset(id: string) {
    await supabase.schema("iot").from("assets").delete().eq("ID", id);
    fetchAssets();
  }

  useEffect(() => {
    fetchAssets();
    fetchLocations();
  }, []);

  return (
    <div className="container mx-auto font-mono py-20 px-6 text-black dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Assets</h1>

      {/* Create Asset Form */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-4">
        <input
          className="p-2 rounded border bg-transparent flex-1"
          placeholder="Asset Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="p-2 rounded border bg-transparent w-48"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          <option value="online" className="dark:bg-black">
            Online
          </option>
          <option value="offline" className="dark:bg-black">
            Offline
          </option>
        </select>

        <select
          className="p-2 rounded border bg-transparent"
          value={locationId}
          onChange={(e) => setLocationId(e.target.value)}
        >
          <option value="" className="dark:bg-black">
            Select Location
          </option>
          {locations.map((loc) => (
            <option key={loc.ID} value={loc.ID} className="dark:bg-black">
              {loc.name}
            </option>
          ))}
        </select>

        <button
          onClick={createAsset}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {/* Assets Table */}
      <div className="overflow-x-auto">
        <table className="table-fixed w-full border-collapse border-b-2 border-slate-700">
          <thead>
            <tr className="bg-black text-white border-b-2 border-slate-700">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  Loading assets...
                </td>
              </tr>
            ) : assets.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-red-500">
                  No assets found
                </td>
              </tr>
            ) : (
              assets.map((asset) => (
                <tr
                  key={asset.ID}
                  className="border-b border-slate-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
                >
                  <td className="p-3">{asset.ID.slice(0, 8)}</td>

                  <td className="p-3">
                    {new Date(asset.createdAtUTC).toLocaleString()}
                  </td>

                  <td className="p-3">{asset.name}</td>

                  <td
                    className={`p-3 font-semibold ${getStatusStyle(
                      asset.status,
                    )}`}
                  >
                    {asset.status}
                  </td>

                  <td className="p-3">{asset.locations?.name || "—"}</td>

                  <td className="p-3">
                    <button
                      onClick={() => deleteAsset(asset.ID)}
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
