export function CustomerSearch({ query }: { query?: string }) {
  return (
    <form className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 md:flex-row md:items-center">
      <input
        name="q"
        defaultValue={query ?? ""}
        placeholder="Search name, phone, email, game ID..."
        className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
      />
      <button className="rounded-xl bg-cyan-400 px-5 py-2 font-semibold text-slate-950 hover:bg-cyan-300">Search</button>
    </form>
  );
}
