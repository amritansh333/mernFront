interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = "Machine Components unavailable",
  message = "Please try again later.",
}: EmptyStateProps) {
  return (
    <main className="pt-16 min-h-[60vh] grid place-items-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-2xl text-charcoal mb-2">{title}</h1>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </main>
  );
}
