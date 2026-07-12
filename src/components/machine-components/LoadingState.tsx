export default function LoadingState() {
  return (
    <main className="pt-16 min-h-[60vh] grid place-items-center bg-background">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="text-sm text-muted-foreground">Loading Machine Components...</p>
      </div>
    </main>
  );
}
