import { type ReactNode } from "react";

import {
  DashboardSectionHeader,
  type DashboardSectionHeaderProps,
} from "@/components/molecules/dashboard-section-header";

type DashboardSectionProps = {
  header: DashboardSectionHeaderProps;
  children: ReactNode;
};

export function DashboardSection({ header, children }: DashboardSectionProps) {
  return (
    <div className="bg-card border-border flex h-full flex-col overflow-hidden rounded-xl border shadow-lg">
      <DashboardSectionHeader {...header} />
      <div className="scrollbar-thin flex-1 overflow-auto">{children}</div>
    </div>
  );
}
