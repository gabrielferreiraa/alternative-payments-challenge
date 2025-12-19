import { MapPin } from "lucide-react";

import type { Character } from "@/types";

import { CharacterEmptyState } from "../molecules/character-empty-state";
import { CharacterErrorState } from "../molecules/character-error-state";
import { CharacterLocationChart } from "./character-location-chart";
import { DashboardSection } from "./dashboard-section";

interface CharacterLocationViewProps {
  characters: Character[];
  isLoading: boolean;
  isError: boolean;
}

export function CharacterLocationView({
  characters,
  isLoading,
  isError,
}: CharacterLocationViewProps) {
  function renderContent() {
    if (isError) return <CharacterErrorState />;

    if (!isLoading && characters.length === 0) {
      return <CharacterEmptyState />;
    }

    return <CharacterLocationChart characters={characters} />;
  }

  return (
    <DashboardSection
      header={{
        icon: <MapPin className="h-5 w-5" />,
        title: "Location Overview",
        description: "See where characters are based",
      }}
    >
      {renderContent()}
    </DashboardSection>
  );
}
