import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SKELETON_ROWS = 20;

export function CharacterTableLoadingState() {
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
        {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Skeleton className="size-13 rounded-xl" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-28 md:hidden" />
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-15" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="h-4 w-36" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
