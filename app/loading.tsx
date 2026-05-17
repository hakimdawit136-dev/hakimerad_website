export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[60vh] items-center justify-center bg-white"
    >
      <span
        aria-hidden
        className="inline-flex size-10 animate-spin rounded-full border-2 border-brand-blue-200 border-t-brand-blue-700"
      />
    </div>
  );
}
