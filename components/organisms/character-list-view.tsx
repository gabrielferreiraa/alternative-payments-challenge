import { useMemo } from "react";

import { Users } from "lucide-react";

import type { Character } from "@/types";

import { EndOfCharacterListNotice } from "../atoms/end-of-character-list-notice";
import { InfiniteScrollTrigger } from "../atoms/infinite-scroll-trigger";
import { LoadMoreCharactersLoader } from "../atoms/load-more-characters-loader";
import { CharacterEmptyState } from "../molecules/character-empty-state";
import { CharacterErrorState } from "../molecules/character-error-state";
import { SearchInput } from "../molecules/search-input";
import { CharacterTable } from "./character-table";
import { CharacterTableLoadingState } from "./character-table-loading-state";
import { DashboardSection } from "./dashboard-section";

interface CharacterListViewProps {
  characters: Character[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function CharacterListView({
  characters,
  totalCount,
  isLoading,
  isError,
  search,
  onSearchChange,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: CharacterListViewProps) {
  function renderContent() {
    if (isError) return <CharacterErrorState />;
    if (isLoading) return <CharacterTableLoadingState />;
    if (characters.length === 0) return <CharacterEmptyState />;

    return (
      <>
        <CharacterTable characters={characters} />
        <InfiniteScrollTrigger
          onIntersect={fetchNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage && <LoadMoreCharactersLoader />}
          {!isFetchingNextPage && !hasNextPage && <EndOfCharacterListNotice />}
        </InfiniteScrollTrigger>
      </>
    );
  }

  const description = useMemo(() => {
    if (isLoading) return "Loading...";
    return `You're viewing ${characters.length} of ${totalCount} characters`;
  }, [characters.length, totalCount, isLoading]);

  return (
    <DashboardSection
      header={{
        icon: <Users className="h-5 w-5" />,
        title: "Characters",
        description,
        children: <SearchInput value={search} onChange={onSearchChange} />,
      }}
    >
      {renderContent()}
    </DashboardSection>
  );
}
