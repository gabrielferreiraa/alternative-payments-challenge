import { type ReactNode } from "react";

export interface DashboardSectionHeaderProps {
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
}

export function DashboardSectionHeader({
  icon,
  title,
  description,
  children,
}: DashboardSectionHeaderProps) {
  return (
    <div className="border-border bg-muted/30 flex flex-col items-start justify-between gap-4 border-b p-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary rounded-lg p-2">{icon}</div>
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-foreground text-lg font-semibold">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
