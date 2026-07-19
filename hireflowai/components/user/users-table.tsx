import { Switch } from "@/components/ui/switch";
import type { HRUser } from "@/action/users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface Props {
  users: HRUser[];
}

export function UsersTable({ users }: Props) {
  return (
    <div className="rounded-xl border">

      <Table>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Enable / Disable</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {users.map((user) => (
            <TableRow key={user.id}>

              <TableCell className="font-medium">
                {user.name}
              </TableCell>

              <TableCell>
                {user.email}
              </TableCell>

              <TableCell>
                {user.role}
              </TableCell>

              <TableCell>
                {user.active ? (
                  <span className="text-green-600">
                    Active
                  </span>
                ) : (
                  <span className="text-red-600">
                    Disabled
                  </span>
                )}
              </TableCell>

              <TableCell>
                <Switch checked={user.active} />
              </TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>

    </div>
  );
}