"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f9fa] px-4">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold text-neutral-900">Something went wrong</h1>
        <p className="text-sm text-neutral-600">{error.message}</p>
        <button
          onClick={reset}
          className="rounded bg-[#eb5a0c] px-6 py-2.5 text-sm font-bold text-white uppercase tracking-wider transition hover:bg-[#d44f0a]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
