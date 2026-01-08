import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Users, Calendar, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Button } from "../../../shared/ui";

const fadeAnimation = {
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  initial: { opacity: 0 },
  transition: { duration: 0.15 },
};

interface CommunityInfoModalProps {
  communityName: string;
  trigger: React.ReactNode;
}

export const CommunityInfoModal = ({ communityName, trigger }: CommunityInfoModalProps) => {
  const [open, setOpen] = useState(false);

  const community = {
    name: communityName,
    description: "This is a sample description for the community.",
    members: 1234,
    createdAt: new Date("2023-01-01"),
    bannerUrl: "",
    iconUrl: "",
    isJoined: false,
  };

  const isAuthenticated = true;
  const joined = community.isJoined;
  const isJoinPending = false;

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
                    Banner
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
                    <div className="-mt-10 mb-4">
                      <div className="h-20 w-20 rounded-full border-4 border-white dark:border-[#1a1a1b] bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
                        {community.name[0].toUpperCase()}
                      </div>
                    </div>

                    <h2 className="text-xl font-bold mb-1">r/{community.name}</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      {community.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{community.members.toLocaleString()} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Created Jan 1, 2023</span>
                      </div>
                    </div>

                    {isAuthenticated && (
                      <div className="flex gap-3 mb-4">
                        <Button
                          variant={joined ? "outline" : "default"}
                          className="flex-1"
                          disabled={joined || isJoinPending}
                        >
                          {joined ? "Joined" : "Join"}
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          disabled={isJoinPending || !joined}
                        >
                          Create Post
                        </Button>
                      </div>
                    )}

                    <Link
                      to="/r/$communityId"
                      params={{ communityId: community.name }}
                      className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
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
