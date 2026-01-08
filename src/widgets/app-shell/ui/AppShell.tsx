import type { ReactNode } from "react";
import { Header } from "../../header";
import { Sidebar } from "../../sidebar";
import { RightSidebar } from "../../right-sidebar";
import { HeroCarousel } from "../../../features/hero-carousel";
import { cn } from "../../../shared/lib";

interface AppShellProps {
  children: ReactNode;
  showHeroCarousel?: boolean;
  showRightSidebar?: boolean;
  fullWidth?: boolean;
}

export const AppShell = ({
  children,
  showHeroCarousel = false,
  showRightSidebar = true,
  fullWidth = false,
}: AppShellProps) => (
  <div className="min-h-screen bg-background">
    <div className={cn("w-full", fullWidth ? "max-w-full" : "max-w-400", "mx-auto")}>
      <Header />
    </div>

    {showHeroCarousel && (
      <div className={cn("w-full", fullWidth ? "max-w-full" : "max-w-400", "mx-auto")}>
        <HeroCarousel />
      </div>
    )}

    <div className={cn("mx-auto w-full", fullWidth ? "max-w-full" : "max-w-400")}>
      <div
        className={cn(
          "grid gap-6 px-4 py-6",
          fullWidth
            ? "grid-cols-1"
            : "grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_320px]"
        )}
      >
        {!fullWidth && (
          <aside className="hidden lg:block">
            <div className="sticky top-18 max-h-[calc(100vh-88px)] overflow-y-auto no-scrollbar">
              <Sidebar />
            </div>
          </aside>
        )}

        <main className={cn("min-w-0", !fullWidth && "lg:max-w-2xl xl:max-w-3xl mx-auto w-full")}>
          {children}
        </main>

        {showRightSidebar && !fullWidth && (
          <aside className="hidden xl:block">
            <div className="sticky top-18 max-h-[calc(100vh-88px)] overflow-y-auto no-scrollbar">
              <RightSidebar />
            </div>
          </aside>
        )}
      </div>
    </div>
  </div>
);
