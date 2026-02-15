"use client";

import AddAsset from "@/components/AddAsset";
import AssetInfo from "@/components/AssetInfo";
import AssetStats from "@/components/AssetStats";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useHomeData } from "./Home.hooks";
import { Asset } from "@/types/Assets";

const HomeContainer = () => {
  const { assets, locations, loading, createAsset, deleteAsset, updateAsset } =
    useHomeData();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const query = search.trim().toLowerCase();
  const isUuidMode = query.startsWith("#");

  const filteredAssets = assets.filter((asset) => {
    const matchesStatus =
      statusFilter === "All" || asset.status === statusFilter;

    if (!matchesStatus) return false;
    if (!query) return true;

    if (isUuidMode) {
      return asset.ID.toLowerCase().includes(query.slice(1));
    }

    return asset.name.toLowerCase().includes(query);
  });

  return (
    <div className="min-h-screen w-full px-6 bg-white dark:bg-black text-black dark:text-white pt-20">
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-2xl font-semibold">Assets</h2>

        {user && (
          <AddAsset
            locations={locations}
            onCreated={(data) => createAsset.mutate(data)}
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="relative flex flex-1 border rounded-lg bg-transparent">
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border-0 bg-transparent outline-none relative z-20"
          />

          {search.startsWith("#") && (
            <p className="absolute inset-0 flex items-center justify-end text-xs text-zinc-500 pointer-events-none z-10 select-none pe-4">
              UUID search mode
            </p>
          )}
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-48 p-2 rounded-lg border bg-transparent"
        >
          <option value="All">All</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      <AssetStats assets={assets} />

      {loading ? (
        <p className="text-center py-16 animate-pulse">Loading assets...</p>
      ) : (
        <div className="my-6">
          <AssetInfo
            assets={filteredAssets}
            locations={locations}
            onDelete={(id) => deleteAsset.mutate(id)}
            canEdit={!!user}
            onUpdated={(data) => updateAsset.mutate(data)}
          />
        </div>
      )}
    </div>
  );
};

export default HomeContainer;
