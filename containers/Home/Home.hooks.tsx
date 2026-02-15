import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Asset } from "@/types/Assets";
import { Location } from "@/types/Location";
import { supabase } from "@/lib/utils/supabaseClient";
import { useEffect, useRef } from "react";

export const useHomeData = () => {
  const queryClient = useQueryClient();

  // 🔁 Helper to refresh assets
  const refreshAssets = () =>
    queryClient.invalidateQueries({ queryKey: ["assets"] });

  // -----------------------------
  // 📥 Queries
  // -----------------------------

  const assetsQuery = useQuery<Asset[]>({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await fetch("/api/iot/assets");
      if (!res.ok) throw new Error("Failed to fetch assets");
      return res.json();
    },
  });

  const locationsQuery = useQuery<Location[]>({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await fetch("/api/iot/locations");
      if (!res.ok) throw new Error("Failed to fetch locations");
      return res.json();
    },
  });

  // -----------------------------
  // 🧠 Shared Mutation Wrapper
  // -----------------------------

  const handleError = (err: unknown) => {
    if (err instanceof Error) toast.error(err.message);
    else toast.error("Something went wrong");
  };

  // -----------------------------
  // ➕ Create
  // -----------------------------

  const createAsset = useMutation({
    mutationFn: async (payload: Partial<Asset>) => {
      const { error } = await supabase
        .schema("iot")
        .from("assets")
        .insert(payload);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Asset created");
      refreshAssets();
    },
    onError: handleError,
  });

  // -----------------------------
  // ✏️ Update
  // -----------------------------

  const updateAsset = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Asset> }) => {
      const { error } = await supabase
        .schema("iot")
        .from("assets")
        .update(data)
        .eq("ID", id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Asset updated");
      refreshAssets();
    },
    onError: handleError,
  });

  // -----------------------------
  // 🗑 Delete
  // -----------------------------

  const deleteAsset = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .schema("iot")
        .from("assets")
        .delete()
        .eq("ID", id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Asset deleted");
      refreshAssets();
    },
    onError: handleError,
  });

  // -----------------------------
  // Return
  // -----------------------------

  return {
    assets: assetsQuery.data ?? [],
    locations: locationsQuery.data ?? [],
    loading: assetsQuery.isLoading || locationsQuery.isLoading,

    createAsset,
    updateAsset,
    deleteAsset,
  };
};
