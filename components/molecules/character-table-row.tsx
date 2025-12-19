import { memo } from "react";

import { CharacterAvatar } from "@/components/molecules/character-avatar";
import { CharacterStatusBadge } from "@/components/molecules/character-status-badge";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Character } from "@/types";

interface CharacterTableRowProps {
  character: Character;
}

export const CharacterTableRow = memo(
  ({ character }: CharacterTableRowProps) => {
    return (
      <TableRow>
        <TableCell>
          <div className="flex items-center gap-3">
            <CharacterAvatar
              name={character.name ?? ""}
              image={character.image}
            />
            <div className="flex flex-col">
              <p className="text-foreground group-hover:text-primary font-medium transition-colors">
                {character.name}
              </p>
              <p className="text-muted-foreground text-xs">
                {character.species}
              </p>
              <p className="text-muted-foreground pt-0.5 text-xs md:hidden">
                {character.location?.name}
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <CharacterStatusBadge status={character.status} />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {character.location?.name}
        </TableCell>
      </TableRow>
    );
  },
);

CharacterTableRow.displayName = "CharacterTableRow";
