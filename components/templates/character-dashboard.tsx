"use client";

import { useState } from "react";

import { useDebounce } from "use-debounce";

import { CharacterListView } from "@/components/organisms/character-list-view";
import { CharacterLocationView } from "@/components/organisms/character-location-view";
import { useInfiniteCharacters } from "@/hooks/use-infinite-characters";

const DEBOUNCE_TIME_MS = 700;

export function CharacterDashboard() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, DEBOUNCE_TIME_MS);

  const {
    characters,
    totalCount,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCharacters(debouncedSearch);

  return (
    <div className="grid h-auto grid-cols-1 gap-4 lg:h-full lg:grid-cols-6">
      <div className="col-span-1 h-[600px] min-h-0 lg:col-span-4 lg:h-full">
        <CharacterListView
          characters={characters}
          totalCount={totalCount}
          isLoading={isLoading}
          isError={isError}
          search={search}
          onSearchChange={setSearch}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
      <div className="col-span-1 h-auto min-h-0 lg:col-span-2 lg:h-full">
        <CharacterLocationView
          characters={characters}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
}
