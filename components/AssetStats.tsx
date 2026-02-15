"use client";

import { Asset } from "@/types/Assets";

interface Props {
  assets: Asset[];
}

const AssetStats: React.FC<Props> = ({ assets }) => {
  const total = assets.length;
  const online = assets.filter((a) => a.status === "online").length;
  const offline = assets.filter((a) => a.status === "offline").length;

  const Card = ({
    label,
    value,
    color,
  }: {
    label: string;
    value: number;
    color: string;
  }) => (
    <div
      className={`rounded-xl p-6 shadow-md border ${color} 
      bg-white dark:bg-zinc-900 transition-all hover:shadow-xl`}
    >
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
      <Card
        label="Total Assets"
        value={total}
        color="border-zinc-200 dark:border-zinc-700"
      />
      <Card label="Online" value={online} color="border-green-500/30" />
      <Card label="Offline" value={offline} color="border-red-500/30" />
    </div>
  );
};

export default AssetStats;
