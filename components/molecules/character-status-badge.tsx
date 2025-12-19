import { type ReactElement } from "react";

import { Heart, HelpCircle, Skull } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type CharacterStatus = "Alive" | "Dead" | "unknown";

interface CharacterStatusBadgeProps {
  status?: CharacterStatus | string | null;
}

const STATUS_BADGE_MAP = {
  Alive: <AliveBadge />,
  Dead: <DeadBadge />,
  unknown: <UnknownBadge />,
} satisfies Record<CharacterStatus, ReactElement>;

export function CharacterStatusBadge({ status }: CharacterStatusBadgeProps) {
  if (status && isCharacterStatus(status)) {
    return STATUS_BADGE_MAP[status];
  }

  return <UnknownBadge />;
}

/**
 * It is necessary to use this function because the "status" field in the schema
 * is a string rather than an enum type.
 */
function isCharacterStatus(value: string) {
  return value === "Alive" || value === "Dead" || value === "unknown";
}

function AliveBadge() {
  return (
    <Badge variant="success">
      <Heart className="size-3" />
      Alive
    </Badge>
  );
}

function DeadBadge() {
  return (
    <Badge variant="error">
      <Skull className="size-3" />
      Dead
    </Badge>
  );
}

function UnknownBadge() {
  return (
    <Badge variant="outline">
      <HelpCircle className="size-3" />
      Unknown
    </Badge>
  );
}
