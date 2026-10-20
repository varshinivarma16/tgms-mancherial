"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { inputClass } from "@/components/ui/Input";
import { whatsappLink } from "@/lib/whatsapp";

// Admission inquiry: nothing is stored on the server — submitting opens WhatsApp with the details filled in.
// The "previous academic record" fields change with the class: Classes 6–10 ask for the last class, Intermediate asks for SSC.
const INTER = 5; // index of "Intermediate 1st Year" in t.classes

const sectionsFor = (isInter) => [
  {
    key: "admission",
    fields: [
      { name: "className", options: "classes", required: true },
      isInter ? { name: "group", options: "groups", required: true } : { name: "medium", options: "mediums", required: true },
    ],
  },
  {
    key: "student",
    fields: [
      { name: "studentName", required: true, wide: true },
      { name: "dob", type: "date", required: true },
      { name: "gender", options: "genders", required: true },
    ],
  },
  {
    key: "academic",
    fields: isInter
      ? [
          { name: "previousSchool", required: true, wide: true },
          { name: "previousBoard", options: "boards", required: true },
          { name: "passingYear", type: "number", required: true, min: 2000, max: 2100 },
          { name: "sscGpa", required: true, placeholder: "e.g. 9.5 / 85%" },
          { name: "sscHallTicket", optional: true },
        ]
      : [
          { name: "previousSchool", required: true, wide: true },
          { name: "previousClass", required: true, placeholder: "e.g. Class 5" },
          { name: "previousBoard", options: "boards", required: true },
          { name: "marks", required: true, placeholder: "e.g. 450/600 or 75%" },
          { name: "passingYear", type: "number", required: true, min: 2000, max: 2100 },
        ],
  },
  {
    key: "parent",
    fields: [
      { name: "parentName", required: true },
      { name: "relation", options: "relations", required: true },
      { name: "mobile", type: "tel", required: true, pattern: "[0-9 +]{10,15}" },
      { name: "village", required: true },
    ],
  },
];

function Field({ field, t, onChange }) {
  const { name, type = "text", options, required, optional, wide, ...rest } = field;
  const common = { name, required, onChange, className: inputClass };
  return (
    <label className={`block text-sm font-medium text-heading ${wide ? "sm:col-span-2" : ""}`}>
      {t[name]}
      {required && <span className="text-danger"> *</span>}
      {optional && <span className="font-normal text-subtle"> ({t.optional})</span>}
      {options ? (
        <select {...common} defaultValue="">
          <option value="" disabled>{t.select}</option>
          {t[options].map((o, i) => <option key={o} value={name === "className" ? i : o}>{o}</option>)}
        </select>
      ) : (
        <input {...common} type={type} {...rest} />
      )}
    </label>
  );
}

export default function AdmissionInquiryForm({ t, whatsapp, schoolName }) {
  const [classIndex, setClassIndex] = useState("");
  const sections = sectionsFor(Number(classIndex) === INTER);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = (name) => (name === "className" ? t.classes[data.get(name)] : data.get(name)?.trim());
    const body = sections.flatMap((s) => [
      "",
      `*${t.sections[s.key]}*`,
      ...s.fields.filter((f) => value(f.name)).map((f) => `${t[f.name]}: ${value(f.name)}`),
    ]);
    window.open(whatsappLink(whatsapp, [`${t.title} – ${schoolName}`, ...body].join("\n")), "_blank", "noopener");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-8">
      {sections.map((s, i) => (
        <fieldset key={s.key} className="rounded-2xl bg-surface p-5 ring-1 ring-line sm:p-6">
          <legend className="float-left mb-5 flex w-full items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">{i + 1}</span>
            {t.sections[s.key]}
          </legend>
          <div className="clear-both grid gap-5 sm:grid-cols-2">
            {s.fields.map((f) => (
              <Field key={f.name} field={f} t={t} onChange={f.name === "className" ? (e) => setClassIndex(e.target.value) : undefined} />
            ))}
          </div>
        </fieldset>
      ))}

      <label className="flex items-start gap-3 text-sm text-body">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-primary" />
        {t.consent}
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center print:hidden">
        <Button type="submit" variant="whatsapp" icon="whatsapp">{t.submit}</Button>
        <Button type="button" variant="outline" onClick={() => window.print()}>{t.print}</Button>
      </div>
      <p className="text-sm text-muted print:hidden">{t.note}</p>
    </form>
  );
}
