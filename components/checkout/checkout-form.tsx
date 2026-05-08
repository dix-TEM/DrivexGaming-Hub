"use client";

import { useActionState } from "react";
import type { PaymentMethod, Product } from "@prisma/client";

import { createConsumerOrderAction, type CheckoutActionState } from "@/server/actions/checkout.actions";

type FieldDefinition = {
  key: string;
  label?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

type CheckoutFormProps = {
  product: Product;
  paymentMethods: PaymentMethod[];
};

const initialState: CheckoutActionState = {
  ok: false,
  message: "",
};

function getFieldDefinitions(requiredFieldsJson: unknown): FieldDefinition[] {
  if (!requiredFieldsJson || typeof requiredFieldsJson !== "object") {
    return [];
  }

  const value = requiredFieldsJson as { fields?: unknown };

  if (!Array.isArray(value.fields)) {
    return [];
  }

  return value.fields.filter((field): field is FieldDefinition => {
    return Boolean(field && typeof field === "object" && typeof (field as FieldDefinition).key === "string");
  });
}

export function CheckoutForm({ product, paymentMethods }: CheckoutFormProps) {
  const [state, action, isPending] = useActionState(createConsumerOrderAction, initialState);
  const fields = getFieldDefinitions(product.requiredFieldsJson);

  return (
    <form action={action} className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/90 p-5 shadow-2xl shadow-black/30 sm:p-7">
      <input type="hidden" name="productSlug" value={product.slug} />

      <div>
        <h2 className="text-xl font-black text-white">Top-up details</h2>
        <p className="mt-1 text-sm text-slate-400">Enter the required game or delivery information carefully.</p>
      </div>

      <div className="space-y-4">
        {fields.length > 0 ? (
          fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <label htmlFor={field.key} className="text-sm font-semibold text-slate-200">
                {field.label ?? field.key} {field.required ? <span className="text-rose-300">*</span> : null}
              </label>
              <input
                id={field.key}
                name={field.key}
                type={field.type === "email" ? "email" : field.type === "tel" ? "tel" : "text"}
                required={Boolean(field.required)}
                placeholder={field.placeholder ?? field.label ?? field.key}
                className="min-h-12 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 text-white outline-none ring-cyan-300/30 placeholder:text-slate-500 focus:ring-4"
              />
              {state.fieldErrors?.[field.key] ? <p className="text-sm text-rose-300">{state.fieldErrors[field.key]}</p> : null}
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">
            This product has no dynamic fields configured. Continue only if the admin has confirmed this item does not need game account details.
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="quantity" className="text-sm font-semibold text-slate-200">
            Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            max="99"
            defaultValue="1"
            required
            className="min-h-12 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 text-white outline-none ring-cyan-300/30 focus:ring-4"
          />
          {state.fieldErrors?.quantity ? <p className="text-sm text-rose-300">{state.fieldErrors.quantity}</p> : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="paymentMethodId" className="text-sm font-semibold text-slate-200">
            Payment method <span className="text-rose-300">*</span>
          </label>
          <select
            id="paymentMethodId"
            name="paymentMethodId"
            required
            className="min-h-12 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 text-white outline-none ring-cyan-300/30 focus:ring-4"
            defaultValue=""
          >
            <option value="" disabled>
              Select payment method
            </option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
          {state.fieldErrors?.paymentMethodId ? <p className="text-sm text-rose-300">{state.fieldErrors.paymentMethodId}</p> : null}
        </div>
      </div>

      {paymentMethods.length > 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
          <p className="font-bold text-white">Payment instructions</p>
          <p className="mt-2 text-slate-400">Choose a payment method above and follow its account instructions. Upload a clear proof image before submitting.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-rose-300/20 bg-rose-300/10 p-4 text-sm text-rose-100">
          No active payment methods are configured. Please contact support before placing an order.
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="proofImage" className="text-sm font-semibold text-slate-200">
          Payment proof image <span className="text-rose-300">*</span>
        </label>
        <input
          id="proofImage"
          name="proofImage"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          required
          className="block w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-200 file:mr-4 file:rounded-xl file:border-0 file:bg-cyan-300 file:px-4 file:py-2 file:font-bold file:text-slate-950"
        />
        <p className="text-xs text-slate-500">Allowed: JPG, PNG, WebP. Max size: 5MB.</p>
        {state.fieldErrors?.proofImage ? <p className="text-sm text-rose-300">{state.fieldErrors.proofImage}</p> : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="customerNote" className="text-sm font-semibold text-slate-200">
          Customer note
        </label>
        <textarea
          id="customerNote"
          name="customerNote"
          rows={4}
          placeholder="Optional note for the support team"
          className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-cyan-300/30 placeholder:text-slate-500 focus:ring-4"
        />
        {state.fieldErrors?.customerNote ? <p className="text-sm text-rose-300">{state.fieldErrors.customerNote}</p> : null}
      </div>

      {state.message ? (
        <div className="rounded-2xl border border-rose-300/20 bg-rose-300/10 p-4 text-sm text-rose-100">{state.message}</div>
      ) : null}

      <button
        type="submit"
        disabled={isPending || paymentMethods.length === 0}
        className="min-h-12 w-full rounded-2xl bg-cyan-300 px-5 font-black text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Creating order..." : "Confirm order and submit proof"}
      </button>

      <p className="text-center text-xs text-slate-500">
        Prices are calculated server-side. Payment will be reviewed before fulfillment begins.
      </p>
    </form>
  );
}
