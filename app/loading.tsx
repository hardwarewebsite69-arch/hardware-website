export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-200 border-t-orange-600" />
        <p className="text-sm font-medium text-neutral-500">Loading...</p>
      </div>
    </div>
  );
}
