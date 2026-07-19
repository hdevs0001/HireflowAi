import { auth } from "@/auth";
import LoginPage from "./login/page";

export default async function page() {
  const session = await auth();

  return (
    <div>
      <h1>Role is :{session?.user.role ?? "Unknown"}</h1>
      <h1>Email is :{session?.user.email ?? "Unknown"}</h1>
    </div>
  );
}
