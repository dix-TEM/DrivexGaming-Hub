type RequiredField = {
  key?: string;
  label?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

function getFields(input: unknown): RequiredField[] {
  if (!input || typeof input !== "object") return [];
  const value = input as { fields?: unknown };
  return Array.isArray(value.fields) ? (value.fields as RequiredField[]) : [];
}

export function RequiredFieldsList({ value }: { value: unknown }) {
  const fields = getFields(value);

  if (fields.length === 0) {
    return <p className="text-sm text-slate-400">No additional checkout fields are configured for this product.</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.key ?? field.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="font-semibold text-white">{field.label ?? field.key}</p>
          <p className="mt-1 text-sm text-slate-400">
            Type: {field.type ?? "text"} · {field.required ? "Required" : "Optional"}
          </p>
        </div>
      ))}
    </div>
  );
}
