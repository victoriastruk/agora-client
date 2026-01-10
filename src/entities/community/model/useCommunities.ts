import { useQuery } from "@tanstack/react-query";
import { communityQueries } from "../api/queries";
import { mapCommunity } from "../api/mappers";

export const useCommunities = (limit = 20, offset = 0) => {
  const { data: communities = [], ...queryInfo } = useQuery({
    ...communityQueries.allSubreddits(),
    select: (data) =>
      Array.isArray(data)
        ? data.slice(offset, offset + limit).map(mapCommunity)
        : [],
  });

  return { communities, ...queryInfo };
};

export const usePopularCommunities = (limit = 10) => {
  const { data: communities = [], ...queryInfo } = useQuery({
    ...communityQueries.allSubreddits(),

    select: (data) =>
      Array.isArray(data)
        ? [...data]
            .map(mapCommunity)
            .sort((a, b) => (b.members || 0) - (a.members || 0))
            .slice(0, limit)
        : [],
  });

  return { communities, ...queryInfo };
};

export const useCommunity = (communityId: string) =>
  useQuery({
    ...communityQueries.subredditById(communityId),
    select: (data) => (data ? mapCommunity(data) : undefined),
  });

// Mock flairs
export const useFlairsByCommunity = (communityId: string) => ({
  flairs: communityId
    ? Array.from({ length: 5 }, (_, i) => ({
        id: `mock-flair-${i + 1}`,
        name: `Flair ${i + 1}`,
        color: ["red", "blue", "green", "yellow", "purple"][i % 5],
      }))
    : [],
  error: null,
  isLoading: false,
  refetch: () => Promise.resolve(),
});
