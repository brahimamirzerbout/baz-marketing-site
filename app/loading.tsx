export default function Loading() {
  return (
    <div className="container mx-auto py-32 md:py-48">
      <div className="max-w-2xl animate-pulse">
        <div className="h-4 w-24 bg-muted rounded mb-6" />
        <div className="h-16 w-full bg-muted rounded mb-4" />
        <div className="h-16 w-3/4 bg-muted rounded mb-8" />
        <div className="h-6 w-full bg-muted rounded mb-2" />
        <div className="h-6 w-5/6 bg-muted rounded" />
      </div>
    </div>
  );
}