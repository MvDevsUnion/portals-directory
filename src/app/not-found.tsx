import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-4">
      <div className="space-y-3 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          404
        </p>
        <h1 className="text-2xl font-semibold text-zinc-900">
          Portal not found
        </h1>
        <p className="text-sm text-zinc-600">
          The portal you are looking for does not exist in the current
          directory.
        </p>
        <Link
          className="text-sm font-medium text-zinc-900 underline-offset-4 hover:underline"
          href="/"
        >
          Return to homepage
        </Link>
      </div>
    </main>
  );
}
