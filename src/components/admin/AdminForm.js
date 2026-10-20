"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Button from "@/components/ui/Button";

function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving…" : label}
    </Button>
  );
}

export default function AdminForm({ action, submitLabel = "Save", children }) {
  const [state, formAction] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-4">
      {children}
      {state?.error && <p className="rounded bg-danger-light p-3 text-sm text-danger">{state.error}</p>}
      {state?.ok && <p className="rounded bg-success-light p-3 text-sm text-success">{state.ok}</p>}
      <SubmitButton label={submitLabel} />
    </form>
  );
}
