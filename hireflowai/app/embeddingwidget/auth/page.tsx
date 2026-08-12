"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const widgetId = searchParams.get("widgetId");

  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  /*
   * User is already authenticated.
   */
  if (session?.user?.email) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-xl border p-8">
          <div>
            <h1 className="text-2xl font-bold">
              You're signed in
            </h1>

            <p className="mt-2 text-gray-500">
              Signed in as
            </p>

            <p className="font-medium">
              {session.user.email}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!widgetId) {
                console.error(
                  "widgetId is missing"
                );
                return;
              }

              router.push(
                `/embeddingwidget/form?widgetId=${encodeURIComponent(
                  widgetId
                )}`
              );
            }}
            className="w-full rounded-lg bg-black px-4 py-3 text-white"
          >
            Continue to application
          </button>
        </div>
      </div>
    );
  }

  /*
   * User isn't authenticated.
   */
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-xl border p-8">
        <div>
          <h1 className="text-2xl font-bold">
            Sign in to continue
          </h1>

          <p className="mt-2 text-gray-500">
            Sign in with Google to continue your
            application.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!widgetId) {
              console.error(
                "widgetId is missing"
              );
              return;
            }

            signIn("google", {
              callbackUrl:
                `/embeddingwidget/auth?widgetId=${encodeURIComponent(
                  widgetId
                )}`,
            });
          }}
          className="flex w-full items-center justify-center gap-3 rounded-lg border px-4 py-3 hover:bg-gray-50"
        >
          <span className="font-medium">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
}