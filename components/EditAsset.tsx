"use client";

import { useEffect, useState } from "react";
import { Asset, AssetStatus } from "@/types/Assets";
import { Location } from "@/types/Location";

interface Props {
  asset: Asset;
  locations: Location[];
  onUpdated?: (data: { id: string; data: Partial<Asset> }) => void;
}

const EditAsset: React.FC<Props> = ({ asset, locations, onUpdated }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(asset.name);
  const [status, setStatus] = useState<AssetStatus>(asset.status);
  const [locationId, setLocationId] = useState(asset.locationID);
  const isDirty =
    name !== asset.name ||
    status !== asset.status ||
    locationId !== asset.locationID;

  // Sync state when modal opens
  useEffect(() => {
    if (open) {
      setName(asset.name);
      setStatus(asset.status);
      setLocationId(asset.locationID);
    }
  }, [open, asset]);

  const handleSave = () => {
    onUpdated?.({
      id: asset.ID,
      data: {
        name,
        status,
        locationID: locationId,
      },
    });

    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-indigo-500 hover:text-indigo-400 transition mr-3"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-96 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Edit Asset</h2>

            <input
              className="w-full mb-3 p-2 border rounded bg-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <select
              className="w-full mb-3 p-2 border rounded bg-transparent"
              value={status}
              onChange={(e) => setStatus(e.target.value as AssetStatus)}
            >
              <option value="online" className="dark:bg-black">
                Online
              </option>
              <option value="offline" className="dark:bg-black">
                Offline
              </option>
            </select>

            <select
              className="w-full mb-4 p-2 border rounded bg-transparent"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
            >
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
                onClick={handleSave}
                disabled={!isDirty}
                className="px-3 py-2 rounded bg-indigo-600 text-white disabled:bg-indigo-400"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAsset;
