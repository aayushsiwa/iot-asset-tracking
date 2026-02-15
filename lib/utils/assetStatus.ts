import { AssetStatus } from "@/types/Assets";

export const getStatusStyle = (status: AssetStatus) => {
  switch (status) {
    case AssetStatus.Online:
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case AssetStatus.Offline:
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
  }
};
