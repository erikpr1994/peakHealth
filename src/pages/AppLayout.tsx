import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import Header from "../components/layout/Header";
import { useTrainerAndClub } from "../hooks/useTrainerAndClub";
import { useAuth } from "@/features/auth/context/AuthContext";
import { NotificationsProvider } from "@/contexts/NotificationsContext";

import { AppLoading } from "../components/shared/loading";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const {
    hasTrainer,
    isClubMember,
    handleToggleTrainer,
    handleToggleClubMembership,
  } = useTrainerAndClub();

  // Show loading while checking auth
  if (isLoading) {
    return <AppLoading />;
  }

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    navigate({ to: "/auth" });
    return null;
  }

  // Convert current path to page type for header compatibility
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path.includes("/exercises/") && path !== "/exercises")
      return "exercise-detail";
    if (path === "/app/exercises") return "exercises";
    if (path.includes("/routines/") && path.endsWith("/edit"))
      return "edit-routine";
    if (
      path.includes("/routines/") &&
      path !== "/routines" &&
      !path.includes("/create")
    )
      return "routine-detail";
    if (path === "/app/routines/create") return "create-routine";
    if (path === "/app/routines") return "routines";
    if (path === "/app/calendar") return "calendar";
    if (path === "/app/performance") return "performance";
    if (path === "/app/health") return "health";
    if (path === "/app/profile") return "profile";
    if (path === "/app/gyms/create") return "create-gym";
    if (path === "/app/gyms/suggest") return "suggest-gym";
    if (path.includes("/gyms/") && path.endsWith("/edit")) return "edit-gym";
    if (path.includes("/gyms/") && path !== "/gyms") return "gym-detail";
    if (path === "/app/gyms") return "gyms";
    if (path === "/app/equipment/suggest") return "suggest-equipment";
    if (path.includes("/equipment/") && path.endsWith("/edit"))
      return "edit-equipment";
    if (path.includes("/equipment/") && path !== "/equipment")
      return "equipment-detail";
    if (path === "/app/equipment") return "equipment";
    if (path === "/app/suggestions/exercise") return "suggest-exercise";
    if (path === "/app/suggestions") return "suggestions";
    if (path === "/app/settings/account") return "account-settings";
    if (path === "/app/settings/app") return "app-settings";
    if (path.includes("/workout/")) return "workout-tracker";
    if (path === "/app/trainer-clubs") return "trainer-and-clubs";
    return "dashboard";
  };

  return (
    <NotificationsProvider>
      <div className="min-h-screen bg-background">
        <Header
          currentPage={getCurrentPage()}
          hasTrainer={hasTrainer}
          onToggleTrainer={handleToggleTrainer}
          isClubMember={isClubMember}
          onToggleClubMembership={handleToggleClubMembership}
        />
        <main>
          <Outlet />
        </main>
      </div>
    </NotificationsProvider>
  );
}
