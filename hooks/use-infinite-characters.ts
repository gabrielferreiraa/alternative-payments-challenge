import { useMemo } from "react";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { graphql } from "@/__generated__/gql";
import { type CharactersQuery } from "@/__generated__/gql/graphql";
import { fetcher } from "@/lib/graphql-fetcher";
import type { Character } from "@/types";

const INITIAL_PAGE = 1;
const STALE_TIME = 1000 * 60 * 5; // 5 minutes

graphql(`
  fragment CharacterFields on Character {
    id
    name
    status
    species
    image
    location {
      id
      name
    }
  }
`);

const CHARACTERS_QUERY = graphql(`
  query Characters($page: Int, $search: String) {
    characters(page: $page, filter: { name: $search }) {
      info {
        count
        pages
        next
      }
      results {
        ...CharacterFields
      }
    }
  }
`);

export const useInfiniteCharacters = (search: string) => {
  const result = useInfiniteQuery<CharactersQuery, Error>({
    queryKey: ["characters", { search }],
    queryFn: ({ pageParam }) => {
      return fetcher(CHARACTERS_QUERY, {
        page: pageParam as number,
        search,
      })();
    },
    getNextPageParam: (lastPage) => lastPage.characters?.info?.next,
    placeholderData: keepPreviousData,
    initialPageParam: INITIAL_PAGE,
    staleTime: STALE_TIME,
  });

  const characters = useMemo(() => {
    return (
      result.data?.pages.flatMap(({ characters }) => {
        const results = characters?.results ?? [];
        /**
         * The GraphQL API may return "characters.results" as null when there are no results.
         * Ideally, "results" should be typed as [Character!] instead of [Character],
         * so we wouldn't need to filter out nulls.
         * This logic ensures we always work with a clean array of Character objects.
         * Reference: https://rickandmortyapi.com/graphql
         */
        return results?.filter(
          (character): character is Character => character !== null,
        );
      }) ?? []
    );
  }, [result.data]);

  const totalCount = useMemo(() => {
    const [firstPage] = result.data?.pages ?? [];
    return firstPage?.characters?.info?.count ?? 0;
  }, [result.data]);

  return {
    characters,
    totalCount,
    isLoading: result.isLoading,
    isError: result.isError,
    isSuccess: result.isSuccess,
    isFetchingNextPage: result.isFetchingNextPage,
    hasNextPage: result.hasNextPage,
    fetchNextPage: result.fetchNextPage,
  };
};
