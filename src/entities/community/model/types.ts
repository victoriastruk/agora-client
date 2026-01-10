export interface Community {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  iconUrl?: string;
  bannerUrl?: string;
  postCount: number;
  members: number;
  isJoined: boolean;
  isPublic: boolean;
  isNSFW: boolean;
  createdAt: string;
}
