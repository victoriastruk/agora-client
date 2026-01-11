import { useMemo } from "react";
import { useDebounce } from "@/shared/hooks";
import { mapPost } from "@/entities/post";
import { mapCommunity } from "@/entities/community/api/mappers";
import { mapUser } from "@/entities/user";

export type SearchType = "posts" | "communities" | "users";

const SEARCH_DEBOUNCE_MS = 300;
const MIN_SEARCH_LENGTH = 2;

const useMockSearchPostsQuery = (
  query: string,
  { limit }: { limit: number },
  { enabled }: { enabled: boolean }
) => {
  const data = enabled
    ? Array.from({ length: limit }, (_, i) => ({
        id: `mock-post-${i + 1}`,
        title: `Mock Post ${i + 1} for "${query}"`,
        content: `Content for mock post ${i + 1}`,
        communityId: `mock-community-${i + 1}`,
        author: { id: `mock-user-${i + 1}`, name: `Mock User ${i + 1}` },
        media: [],
        score: Math.floor(Math.random() * 100),
        commentCount: Math.floor(Math.random() * 50),
      }))
    : [];
  return {
    data,
    isLoading: false,
    isFetching: false,
    error: null,
    refetch: () => Promise.resolve(),
  };
};

const useMockSearchCommunitiesQuery = (
  query: string,
  { limit }: { limit: number },
  { enabled }: { enabled: boolean }
) => {
  const data = enabled
    ? Array.from({ length: limit }, (_, i) => ({
        id: `mock-community-${i + 1}`,
        name: `Mock Community ${i + 1} for "${query}"`,
        description: `Description for community ${i + 1}`,
        iconUrl: null,
      }))
    : [];
  return {
    data,
    isLoading: false,
    isFetching: false,
    error: null,
    refetch: () => Promise.resolve(),
  };
};

const useMockSearchUsersQuery = (
  query: string,
  { limit }: { limit: number },
  { enabled }: { enabled: boolean }
) => {
  const data = enabled
    ? Array.from({ length: limit }, (_, i) => ({
        id: `mock-user-${i + 1}`,
        name: `Mock User ${i + 1} for "${query}"`,
        avatarUrl: null,
      }))
    : [];
  return {
    data,
    isLoading: false,
    isFetching: false,
    error: null,
    refetch: () => Promise.resolve(),
  };
};

export const useSearchPosts = (query: string, limit = 20, offset = 0) => {
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);
  const isValidQuery = debouncedQuery.length >= MIN_SEARCH_LENGTH;

  const { data, isLoading, isFetching, error, refetch } =
    useMockSearchPostsQuery(
      debouncedQuery,
      { limit, offset },
      { enabled: isValidQuery }
    );

  const posts = useMemo(() => (data ?? []).map(mapPost), [data]);

  return {
    error,
    isLoading: isValidQuery && isLoading,
    isPending: query !== debouncedQuery && query.length >= MIN_SEARCH_LENGTH,
    isSearching: isFetching,
    posts,
    refetch,
  };
};

export const useSearchCommunities = (query: string, limit = 20, offset = 0) => {
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);
  const isValidQuery = debouncedQuery.length >= MIN_SEARCH_LENGTH;

  const { data, isLoading, isFetching, error, refetch } =
    useMockSearchCommunitiesQuery(
      debouncedQuery,
      { limit, offset },
      { enabled: isValidQuery }
    );

  const communities = useMemo(() => (data ?? []).map(mapCommunity), [data]);

  return {
    communities,
    error,
    isLoading: isValidQuery && isLoading,
    isPending: query !== debouncedQuery && query.length >= MIN_SEARCH_LENGTH,
    isSearching: isFetching,
    refetch,
  };
};

export const useSearchUsers = (query: string, limit = 20, offset = 0) => {
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);
  const isValidQuery = debouncedQuery.length >= MIN_SEARCH_LENGTH;

  const { data, isLoading, isFetching, error, refetch } =
    useMockSearchUsersQuery(
      debouncedQuery,
      { limit, offset },
      { enabled: isValidQuery }
    );

  const users = useMemo(() => (data ?? []).map(mapUser), [data]);

  return {
    error,
    isLoading: isValidQuery && isLoading,
    isPending: query !== debouncedQuery && query.length >= MIN_SEARCH_LENGTH,
    isSearching: isFetching,
    refetch,
    users,
  };
};

export const useSearch = (query: string, limit = 10) => {
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);
  const isValidQuery = debouncedQuery.length >= MIN_SEARCH_LENGTH;

  const {
    data: postsData,
    isLoading: postsLoading,
    isFetching: postsFetching,
  } = useMockSearchPostsQuery(
    debouncedQuery,
    { limit },
    { enabled: isValidQuery }
  );

  const {
    data: communitiesData,
    isLoading: communitiesLoading,
    isFetching: communitiesFetching,
  } = useMockSearchCommunitiesQuery(
    debouncedQuery,
    { limit },
    { enabled: isValidQuery }
  );

  const {
    data: usersData,
    isLoading: usersLoading,
    isFetching: usersFetching,
  } = useMockSearchUsersQuery(
    debouncedQuery,
    { limit },
    { enabled: isValidQuery }
  );

  const posts = useMemo(() => (postsData ?? []).map(mapPost), [postsData]);
  const communities = useMemo(
    () => (communitiesData ?? []).map(mapCommunity),
    [communitiesData]
  );
  const users = useMemo(() => (usersData ?? []).map(mapUser), [usersData]);

  const isLoading =
    isValidQuery && (postsLoading || communitiesLoading || usersLoading);
  const isFetching = postsFetching || communitiesFetching || usersFetching;
  const isPending =
    query !== debouncedQuery && query.length >= MIN_SEARCH_LENGTH;

  return {
    communities,
    debouncedQuery,
    hasResults: posts.length > 0 || communities.length > 0 || users.length > 0,
    isFetching,
    isLoading,
    isPending,
    posts,
    users,
  };
};
