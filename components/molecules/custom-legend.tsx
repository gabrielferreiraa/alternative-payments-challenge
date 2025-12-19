interface CustomLegendProps {
  payload: {
    name: string;
    count: number;
    color: string;
  }[];
}

export function CustomLegend({ payload }: CustomLegendProps) {
  return (
    <div className="scrollbar-thin mt-4 grid max-h-[200px] grid-cols-2 gap-2 overflow-y-auto px-2">
      {payload.map(({ name, count, color }, index) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          <span
            className="h-3 w-3 shrink-0 rounded"
            style={{ backgroundColor: color }}
          />
          <span
            className="text-muted-foreground truncate"
            title={`${name} (${count})`}
          >
            {name} ({count})
          </span>
        </div>
      ))}
    </div>
  );
}
