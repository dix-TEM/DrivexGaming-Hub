import { logoutAction } from "@/server/actions/auth.actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-slate-50" type="submit">
        Sign out
      </button>
    </form>
  );
}
