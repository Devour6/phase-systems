import { cookies } from "next/headers";

export const ADMIN_COOKIE = "phase_admin";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "PHASE123!";
}

export async function isAdminAuthed(): Promise<boolean> {
  const c = await cookies();
  const v = c.get(ADMIN_COOKIE)?.value;
  return v === getAdminPassword();
}
