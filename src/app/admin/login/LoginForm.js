"use client";

import { useActionState } from "react";
import { login } from "../actions";
import Button from "@/components/ui/Button";
import { inputClass as input, Label } from "@/components/ui/Input";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <Label label="Email">
        <input type="email" name="email" required autoComplete="email" className={input} />
      </Label>
      <Label label="Password">
        <input type="password" name="password" required autoComplete="current-password" className={input} />
      </Label>
      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      <Button disabled={pending} block>
        {pending ? "Logging in…" : "Log in"}
      </Button>
    </form>
  );
}
