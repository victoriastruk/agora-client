import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { Button } from '../../../shared/ui';
import { useCommunity } from '../../../entities/community';
import { useIsAuthenticated } from '../../../entities/session';
import { useCommunityActions } from '../../../features/community';
import { CommunityStats } from '../../../entities/community/ui/community-stats';

const fadeAnimation = {
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  initial: { opacity: 0 },
  transition: { duration: 0.15 },
};

interface CommunityInfoModalProps {
  communityId: string;
  trigger: React.ReactNode;
}

export const CommunityInfoModal = ({
  communityId,
  trigger,
}: CommunityInfoModalProps) => {
  const [open, setOpen] = useState(false);
  const { data: community, isLoading } = useCommunity(communityId);
  const isAuthenticated = useIsAuthenticated();
  const { join, leave, isJoined, isPending, joinLabel } = useCommunityActions(
    communityId,
    false
  );

  if (!community && !isLoading) {
    return null;
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>

      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/70 z-40"
                {...fadeAnimation}
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild>
              <motion.div
                {...fadeAnimation}
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
              >
                <div className="relative w-full max-w-md rounded-xl bg-white dark:bg-[#1a1a1b] shadow-xl overflow-hidden">
                  {/* Banner */}
                  <div className="h-24 bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {community?.bannerUrl && (
                      <img
                        src={community.bannerUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <DialogPrimitive.Close asChild>
                    <button
                      aria-label="Close"
                      className="absolute right-3 top-3 flex items-center justify-center h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </DialogPrimitive.Close>

                  <div className="p-6 pt-0">
                    <DialogPrimitive.Title className="sr-only">
                      Community Information
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Description className="sr-only">
                      View details and information about this community
                    </DialogPrimitive.Description>

                    {isLoading ? (
                      <div className="space-y-4">
                        <div className="-mt-10 mb-4">
                          <div className="h-20 w-20 rounded-full border-4 border-white dark:border-[#1a1a1b] bg-muted animate-pulse" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-6 bg-muted animate-pulse rounded w-32" />
                          <div className="h-4 bg-muted animate-pulse rounded w-48" />
                          <div className="flex gap-4">
                            <div className="h-4 bg-muted animate-pulse rounded w-20" />
                            <div className="h-4 bg-muted animate-pulse rounded w-24" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="-mt-10 mb-4">
                          {community?.iconUrl ? (
                            <img
                              src={community.iconUrl}
                              alt={community.name}
                              className="h-20 w-20 rounded-full border-4 border-white dark:border-[#1a1a1b] object-cover"
                            />
                          ) : (
                            <div className="h-20 w-20 rounded-full border-4 border-white dark:border-[#1a1a1b] bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
                              {community?.name[0].toUpperCase()}
                            </div>
                          )}
                        </div>

                        <h2 className="text-xl font-bold mb-1">
                          r/{community?.name}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">
                          {community?.description &&
                          community.description.trim()
                            ? community.description
                            : 'No description available.'}
                        </p>

                        {community && <CommunityStats community={community} />}
                      </>
                    )}

                    {isAuthenticated && (
                      <div className="flex gap-3 mb-4 mt-6">
                        <Button
                          variant={isJoined ? 'outline' : 'default'}
                          className="flex-1"
                          onClick={isJoined ? leave : join}
                          disabled={isPending}
                        >
                          {isPending ? 'Loading...' : joinLabel}
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          disabled={!community?.isJoined}
                        >
                          Create Post
                        </Button>
                      </div>
                    )}

                    <Link
                      to="/r/$communityId"
                      params={{ communityId: community?.id || '' }}
                      className="flex items-center justify-center gap-2 text-sm text-primary hover:underline mt-6"
                      onClick={() => setOpen(false)}
                    >
                      <ExternalLink className="h-4 w-4" />
                      View full community page
                    </Link>
                  </div>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
};
