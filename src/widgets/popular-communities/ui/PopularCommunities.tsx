import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../shared/ui/card";
import { Badge } from "../../../shared/ui/badge";
import { Users } from "lucide-react";
import { Link } from "@tanstack/react-router";

const useMockPopularCommunitiesQuery = (limit: number) => {
  const data = Array.from({ length: limit }, (_, i) => ({
    id: `mock-community-${i + 1}`,
    name: `mockcommunity${i + 1}`,
    members: Math.floor(Math.random() * 10000),
  }));

  return { data, isLoading: false, error: null };
};

export function PopularCommunities() {
  const {
    data: communities,
    isLoading,
    error,
  } = useMockPopularCommunitiesQuery(5);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Popular Communities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-8 w-8 bg-muted rounded-full animate-pulse" />
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-muted rounded animate-pulse w-20" />
                  <div className="h-3 bg-muted rounded animate-pulse w-16" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Popular Communities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Failed to load communities</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Communities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {communities?.map((community) => (
            <Link
              key={community.id}
              to="/r/$communityId"
              params={{ communityId: community.id }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  r/{community.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    r/{community.name}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Users className="h-3 w-3" />
                  <span>{community.members.toLocaleString()} members</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
