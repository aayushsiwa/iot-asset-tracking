export type Asset = {
  ID: string;
  name: string;
  status: AssetStatus;
  locationID: string;
  createdAtUTC: string;
  updatedAtUTC: string;
  locations?: {
    name: string;
  };
};

export enum AssetStatus {
  Online = "online",
  Offline = "offline",
}
