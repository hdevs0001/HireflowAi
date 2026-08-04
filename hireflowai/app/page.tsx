"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Role is: {session?.user.role ?? "Unknown"}</h1>
      <h1>Email is: {session?.user.email ?? "Unknown"}</h1>
      <h1>Domain Name: {window.location.origin}</h1>
      <h1>Company id :{session?.user.companyId}</h1>
    </div>
  );
}