export interface AuthUserData {
  id: number;
  username: string;
  email?: string;
}

export const extractUserFromResponse = (response: unknown): AuthUserData | null => {
  if (typeof response === "object" && response !== null) {
    const resp = response as Record<string, unknown>;

    if (resp.success === true && typeof resp.data === "object" && resp.data !== null) {
      const data = resp.data as Record<string, unknown>;
      if (typeof data.user === "object" && data.user !== null) {
        const user = data.user as Record<string, unknown>;
        if (
          typeof user.id === "number" &&
          typeof user.username === "string" &&
          (user.email === undefined || typeof user.email === "string")
        ) {
          return {
            id: user.id,
            username: user.username,
            email: user.email as string | undefined,
          };
        }
      }
    }

    if (typeof resp.username === "string") {
      let userId = 0;
      if (typeof resp.id === "number") {
        userId = resp.id;
      } else if (typeof resp.id === "string") {
        userId = parseInt(resp.id) || 0;
      } else {
        userId = resp.username.split("").reduce((hash, char) => {
          return (hash << 5) - hash + char.charCodeAt(0);
        }, 0);
      }

      return {
        id: userId,
        username: resp.username,
        email: (resp.email as string) || undefined,
      };
    }

    if (typeof resp.user === "object" && resp.user !== null) {
      const user = resp.user as Record<string, unknown>;
      if (typeof user.id === "number" && typeof user.username === "string") {
        console.log("Found nested user object format");
        return {
          id: user.id,
          username: user.username,
          email: (user.email as string) || undefined,
        };
      }
    }

    if (resp.status === 200 && typeof resp.data === "object" && resp.data !== null) {
      const data = resp.data as Record<string, unknown>;
      if (typeof data.user === "object" && data.user !== null) {
        const user = data.user as Record<string, unknown>;
        if (
          typeof user.id === "number" &&
          typeof user.username === "string" &&
          (user.email === undefined || typeof user.email === "string")
        ) {
          return {
            id: user.id,
            username: user.username,
            email: user.email as string | undefined,
          };
        }
      }
    }
  }

  return null;
};
