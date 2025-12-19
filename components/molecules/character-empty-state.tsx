import { Users } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function CharacterEmptyState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Users />
        </EmptyMedia>
        <EmptyTitle>No characters found</EmptyTitle>
        <EmptyDescription>Try searching for a different name.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
