import { SearchAlert } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function CharacterErrorState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchAlert />
        </EmptyMedia>
        <EmptyTitle>Failed to load characters</EmptyTitle>
        <EmptyDescription>
          An error occurred while fetching character data. Please try again
          later.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
