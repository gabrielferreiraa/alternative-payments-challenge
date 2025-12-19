import { Loader2 } from "lucide-react";

export function LoadMoreCharactersLoader() {
  return (
    <div className="flex w-full items-center justify-center gap-2 p-4">
      <Loader2 className="text-muted-foreground animate-spin" />
      <p className="text-muted-foreground text-sm">
        Loading more characters...
      </p>
    </div>
  );
}
