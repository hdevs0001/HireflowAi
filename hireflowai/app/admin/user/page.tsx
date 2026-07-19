import { UserTabs } from "@/components/user/usertabs";
import { getAllHRUsers } from "@/action/users";

export default async function UsersPage() {
  const users = await getAllHRUsers();

  return (
    <div className="space-y-6 p-4">

      <div>
        <h1 className="text-3xl font-bold">
          HR Management
        </h1>

        <p className="text-muted-foreground">
          Create HR accounts and manage access to your company's recruitment workspace.
        </p>
      </div>

      <UserTabs users={users} />

    </div>
  );
}