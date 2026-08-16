"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl font-bold mb-2">Application error</h1>
          <p className="text-muted-foreground mb-6">
            Something went wrong at the application level.
          </p>
          <button
            onClick={() => reset()}
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}