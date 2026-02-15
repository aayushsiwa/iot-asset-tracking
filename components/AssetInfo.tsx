import { getStatusStyle } from "@/lib/utils/assetStatus";
import { Asset } from "@/types/Assets";
import React from "react";
import EditAsset from "@/components/EditAsset";
import { Location } from "@/types/Location";
import ConfirmDelete from "./ConfirmDelete";

interface Props {
  assets: Asset[];
  locations: Location[];
  onDelete?: (id: string) => void;
  onUpdated?: (data: { id: string; data: Partial<Asset> }) => void;
  canEdit?: boolean;
}

const AssetInfo: React.FC<Props> = ({
  assets,
  locations,
  onDelete,
  onUpdated,
  canEdit,
}) => {
  if (!assets.length) {
    return (
      <div className="flex items-center justify-center border border-dashed rounded-xl p-12 bg-zinc-50 dark:bg-zinc-900">
        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium">
          No assets found
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {assets.map((asset) => (
        <div
          key={asset.ID}
          className="group border border-zinc-200 dark:border-zinc-700
           rounded-xl p-5
           bg-white dark:bg-zinc-900
           shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]
           hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.20)]
           hover:-translate-y-1
           transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
              {asset.name}
            </h2>
            <span className="text-xs text-zinc-400">
              #{asset.ID.split("-")[0]}
            </span>
          </div>

          <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${getStatusStyle(
              asset.status,
            )}`}
          >
            {asset.status}
          </span>

          <div className="text-sm text-zinc-600 dark:text-zinc-300 space-y-2">
            <p>
              <span className="font-medium text-zinc-700 dark:text-zinc-400">
                Location:
              </span>{" "}
              {asset.locations?.name || "—"}
            </p>

            <p>
              <span className="font-medium text-zinc-700 dark:text-zinc-400">
                Last Updated:
              </span>{" "}
              {new Date(asset.updatedAtUTC).toLocaleString()}
            </p>
          </div>

          {canEdit && (
            <div className="mt-4 flex items-center">
              <EditAsset
                asset={asset}
                locations={locations}
                onUpdated={onUpdated}
              />
              <ConfirmDelete
                label="asset"
                onConfirm={() => onDelete?.(asset.ID)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AssetInfo;
