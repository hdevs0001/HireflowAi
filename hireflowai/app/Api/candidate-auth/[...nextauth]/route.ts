// app/api/candidate-auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth.candidate";

export const { GET, POST } = handlers;
