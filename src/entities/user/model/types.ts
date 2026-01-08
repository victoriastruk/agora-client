export interface User {
  id: string;
  username: string;
  name?: string;
  email?: string;
  bio?: string;
  avatarUrl?: string;
  karma: number;
  createdAt: string;
}
