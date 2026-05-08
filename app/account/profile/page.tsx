import { AccountNav } from "@/components/account/account-nav";
import { ProfileForm } from "@/components/account/profile-form";
import { getProfile, requireActiveUser } from "@/server/services/account.service";

export default async function AccountProfilePage() {
  const user = await requireActiveUser();
  const profile = await getProfile(user.id);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <AccountNav />
        <section className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">Profile</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Account profile</h1>
          <p className="mt-3 text-slate-400">Update your basic profile information. Role and email changes are admin-controlled.</p>
        </section>
        <ProfileForm user={profile} />
      </div>
    </main>
  );
}
