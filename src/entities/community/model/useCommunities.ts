import { useMemo } from 'react';

const mapCommunity = (community: any) => ({
  id: community.id,
  name: community.name,
  description: community.description,
  members: community.members ?? 0,
  iconUrl: community.iconUrl ?? null,
});

const mockCommunity = (i: number) => ({
  id: `mock-community-${i + 1}`,
  name: `mockcommunity${i + 1}`,
  description: `Description for mock community ${i + 1}`,
  members: Math.floor(Math.random() * 10000),
  iconUrl: null,
});

const useMockCommunitiesQuery = ({ limit }: { limit: number }) => ({
  data: Array.from({ length: limit }, (_, i) => mockCommunity(i)),
  isLoading: false,
  error: null,
  refetch: () => Promise.resolve(),
});

const useMockCommunityQuery = (id: string) => ({
  data: id ? mockCommunity(parseInt(id.replace(/\D/g, ''), 10)) : null,
  isLoading: false,
  error: null,
  refetch: () => Promise.resolve(),
});

export const useCommunities = (limit = 20, offset = 0) => {
  const { data, isLoading, error, refetch } = useMockCommunitiesQuery({
    limit,
  });

  const communities = useMemo(() => (data ?? []).map(mapCommunity), [data]);

  return { communities, error, isLoading, refetch };
};

export const usePopularCommunities = (limit = 10) => {
  const { data, isLoading, error, refetch } = useMockCommunitiesQuery({
    limit,
  });

  const communities = useMemo(() => (data ?? []).map(mapCommunity), [data]);

  return { communities, error, isLoading, refetch };
};

export const useCommunity = (communityId: string) => {
  const { data, isLoading, error, refetch } =
    useMockCommunityQuery(communityId);

  const community = useMemo(
    () => (data ? mapCommunity(data) : undefined),
    [data]
  );

  return { community, error, isLoading, refetch };
};

export const useCommunityByName = (name: string) => {
  const { data, isLoading, error, refetch } = useMockCommunityQuery(name);

  const community = useMemo(
    () => (data ? mapCommunity(data) : undefined),
    [data]
  );

  return { community, error, isLoading, refetch };
};

export const useFlairsByCommunity = (communityId: string) => ({
  flairs: communityId
    ? Array.from({ length: 5 }, (_, i) => ({
        id: `mock-flair-${i + 1}`,
        name: `Flair ${i + 1}`,
        color: ['red', 'blue', 'green', 'yellow', 'purple'][i % 5],
      }))
    : [],
  error: null,
  isLoading: false,
  refetch: () => Promise.resolve(),
});
