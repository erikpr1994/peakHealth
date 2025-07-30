import React from "react";
import { Page, NavigateFunction, OnboardingData } from "@/types/app";
import Dashboard from "@/features/dashboard/Dashboard";
import ExercisesList from "@/features/exercises/ExercisesList";
import ExerciseDetail from "@/features/exercises/ExerciseDetail";
import Routines from "@/features/routines/Routines";
import RoutineDetail from "@/features/routines/RoutineDetail";
import RoutineCreation from "@/features/routines/RoutineCreation";
import Calendar from "@/features/calendar/Calendar";
import Performance from "@/features/performance/Performance";
import Health from "@/features/health/Health";
import Profile from "@/features/profile/Profile";
import Gyms from "@/features/gyms/Gyms";
import CreateGym from "@/features/gyms/CreateGym";
import SuggestGym from "@/features/gyms/SuggestGym";
import EditGym from "@/features/gyms/EditGym";
import GymDetail from "@/features/gyms/GymDetail";
import Equipment from "@/features/equipment/Equipment";
import SuggestEquipment from "@/features/equipment/SuggestEquipment";
import EditEquipment from "@/features/equipment/EditEquipment";
import EquipmentDetail from "@/features/equipment/EquipmentDetail";
import Suggestions from "@/features/suggestions/Suggestions";
import SuggestExercise from "@/features/suggestions/SuggestExercise";
import AccountSettings from "@/features/settings/AccountSettings";
import AppSettings from "@/features/settings/AppSettings";
import WorkoutTracker from "@/features/workout/WorkoutTracker";
import TrainerAndClubs from "@/features/social/TrainerAndClubs";

interface AppRouterProps {
  currentPage: Page;
  selectedItemId: string | null;
  onNavigate: NavigateFunction;
  hasTrainer: boolean;
  isClubMember: boolean;
  onboardingData: OnboardingData;
}

export default function AppRouter({
  currentPage,
  selectedItemId,
  onNavigate,
  hasTrainer,
  isClubMember,
  onboardingData,
}: AppRouterProps) {
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
            onNavigate={onNavigate}
            hasTrainer={hasTrainer}
            isClubMember={isClubMember}
            onboardingData={onboardingData}
          />
        );
      case "exercises":
        return <ExercisesList onNavigate={onNavigate} />;
      case "exercise-detail":
        return (
          <ExerciseDetail onNavigate={onNavigate} exerciseId={selectedItemId} />
        );
      case "routines":
        return <Routines onNavigate={onNavigate} />;
      case "routine-detail":
        return (
          <RoutineDetail onNavigate={onNavigate} routineId={selectedItemId} />
        );
      case "create-routine":
        return <RoutineCreation onNavigate={onNavigate} />;
      case "calendar":
        return <Calendar onNavigate={onNavigate} />;
      case "performance":
        return <Performance onNavigate={onNavigate} />;
      case "health":
        return <Health onNavigate={onNavigate} />;
      case "profile":
        return <Profile onNavigate={onNavigate} />;
      case "gyms":
        return <Gyms onNavigate={onNavigate} />;
      case "create-gym":
        return <CreateGym onNavigate={onNavigate} />;
      case "suggest-gym":
        return <SuggestGym onNavigate={onNavigate} />;
      case "edit-gym":
        return <EditGym onNavigate={onNavigate} gymId={selectedItemId} />;
      case "gym-detail":
        return <GymDetail onNavigate={onNavigate} gymId={selectedItemId} />;
      case "equipment":
        return <Equipment onNavigate={onNavigate} />;
      case "suggest-equipment":
        return <SuggestEquipment onNavigate={onNavigate} />;
      case "edit-equipment":
        return (
          <EditEquipment onNavigate={onNavigate} equipmentId={selectedItemId} />
        );
      case "equipment-detail":
        return (
          <EquipmentDetail
            onNavigate={onNavigate}
            equipmentId={selectedItemId}
          />
        );
      case "suggestions":
        return <Suggestions onNavigate={onNavigate} />;
      case "suggest-exercise":
        return <SuggestExercise onNavigate={onNavigate} />;
      case "account-settings":
        return <AccountSettings onNavigate={onNavigate} />;
      case "app-settings":
        return <AppSettings onNavigate={onNavigate} />;
      case "workout-tracker":
        return (
          <WorkoutTracker onNavigate={onNavigate} routineId={selectedItemId} />
        );
      case "trainer-and-clubs":
        return <TrainerAndClubs onNavigate={onNavigate} />;
      default:
        return (
          <Dashboard
            onNavigate={onNavigate}
            hasTrainer={hasTrainer}
            isClubMember={isClubMember}
            onboardingData={onboardingData}
          />
        );
    }
  };

  return <>{renderCurrentPage()}</>;
}
