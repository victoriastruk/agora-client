import type { Community } from "../model/types";

export const mapCommunity = (data: any): Community => ({
  id: data.id,
  name: data.name,
  displayName: data.displayName || data.name,
  description: data.description,
  iconUrl: data.iconUrl,
  bannerUrl: data.bannerUrl,
  members: data.members || 0,
  createdAt: data.createdAt,
});
