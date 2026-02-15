"use client";

import { useState } from "react";
import { Asset, AssetStatus } from "@/types/Assets";
import { Location } from "@/types/Location";

interface Props {
  locations: Location[];
  onCreated: (data: Partial<Asset>) => void;
}

const AddAsset: React.FC<Props> = ({ locations, onCreated }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<AssetStatus>(AssetStatus.Offline);
  const [locationId, setLocationId] = useState("");

  const createAsset = async () => {
    if (!name || !locationId) return;

    setName("");
    setLocationId("");
    setStatus(AssetStatus.Offline);
    onCreated({ name, status, locationID: locationId });
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition"
      >
        + Add Asset
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-96 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Create Asset</h2>

            <input
              className="w-full mb-3 p-2 border rounded bg-transparent"
              placeholder="Asset Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <select
              className="w-full mb-3 p-2 border rounded bg-transparent"
              value={status}
              onChange={(e) => setStatus(e.target.value as AssetStatus)}
            >
              <option value={AssetStatus.Online} className="dark:bg-black">
                Online
              </option>
              <option value={AssetStatus.Offline} className="dark:bg-black">
                Offline
              </option>
            </select>

            <select
              className="w-full mb-4 p-2 border rounded bg-transparent"
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

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={createAsset}
                className="px-3 py-2 rounded bg-indigo-600 text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAsset;
