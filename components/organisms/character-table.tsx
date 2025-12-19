import { memo } from "react";

import { CharacterTableRow } from "@/components/molecules/character-table-row";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Character } from "@/types";

interface CharacterTableProps {
  characters: Character[];
}

export const CharacterTable = memo(({ characters }: CharacterTableProps) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Character</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Location</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {characters.map((character) => (
          <CharacterTableRow key={character.id} character={character} />
        ))}
      </TableBody>
    </Table>
  );
});

CharacterTable.displayName = "CharacterTable";
