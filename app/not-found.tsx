import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-8xl font-black text-neutral-200">404</h1>
        <h2 className="text-2xl font-bold text-neutral-900">Page not found</h2>
        <p className="text-sm text-neutral-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-500"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
