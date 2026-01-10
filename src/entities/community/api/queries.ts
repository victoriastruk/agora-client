import { queryOptions } from "@tanstack/react-query";
import { communityKeys } from "./query-keys";
import { communityApi } from "./communityApi";

export const communityQueries = {
  allSubreddits: () =>
    queryOptions({
      queryFn: communityApi.getSubreddits,
      queryKey: communityKeys.list({}),
      staleTime: 5 * 60 * 1000,
    }),

  subredditById: (id: string) =>
    queryOptions({
      queryFn: () => communityApi.getSubredditById(id),
      queryKey: communityKeys.detail(id),
      staleTime: 5 * 60 * 1000,
      enabled: !!id,
    }),
} as const;
