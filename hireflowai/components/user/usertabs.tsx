import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { HRUser } from "@/action/users";
import { CreateUserForm } from "./create-user-form";
import { UsersTable } from "./users-table";

interface Props {
  users: HRUser[];
}

export function UserTabs({ users }: Props) {
  return (
    <Tabs defaultValue="create" className="space-y-6">

      <TabsList>
        <TabsTrigger value="create">
          Create HR
        </TabsTrigger>

        <TabsTrigger value="manage">
          Manage HR
        </TabsTrigger>
      </TabsList>

      <TabsContent value="create">
        <CreateUserForm />
      </TabsContent>

      <TabsContent value="manage">
        <UsersTable users={users} />
      </TabsContent>

    </Tabs>
  );
}