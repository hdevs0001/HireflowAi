import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreateUserForm() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Create HR Account</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            The HR will use these credentials to log into your company
            workspace.
          </p>
        </div>

        <div className="space-y-5">
          <Input placeholder="Full Name" />

          <Input type="email" placeholder="Email" />

          <Input type="password" placeholder=" Password" />

          <Button className="mx-auto flex px-8">Create HR</Button>
        </div>
      </div>
    </div>
  );
}
