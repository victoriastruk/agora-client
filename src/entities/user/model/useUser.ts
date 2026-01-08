import { useMemo } from "react";
import type { User } from "./types";

const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => ({
  id: `mock-user-${i + 1}`,
  username: `user${i + 1}`,
  name: i % 3 === 0 ? `User ${i + 1}` : undefined,
  email: `user${i + 1}@example.com`,
  bio: i % 4 === 0 ? `Bio for user ${i + 1}` : undefined,
  avatarUrl: i % 5 === 0 ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}` : undefined,
  karma: Math.floor(Math.random() * 10000),
  createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
}));

export const useUserByUsername = (username: string) => {
  const user = useMemo(() => mockUsers.find(u => u.username === username), [username]);

  return {
    user: user || null,
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve(),
  };
};

export const mapUser = (data: any): User => ({
  id: data.id,
  username: data.username,
  name: data.name,
  email: data.email,
  bio: data.bio,
  avatarUrl: data.avatarUrl,
  karma: data.karma,
  createdAt: data.createdAt,
});
