import { inputClass, Label } from "@/components/ui/Input";
import ImageInput from "./ImageInput";

export default function Field({ field, value }) {
  const { name, label, type, required } = field;

  if (type === "checkbox") {
    return (
      <label className="flex items-center gap-2 text-sm font-medium text-body">
        <input type="checkbox" name={name} defaultChecked={Boolean(value ?? field.default)} className="h-4 w-4 accent-primary" />
        {label}
      </label>
    );
  }

  if (type === "image") {
    return (
      <div className="text-sm font-medium text-body">
        {label}
        {required && " *"}
        <div className="mt-1 flex items-center gap-4">
          {value && <img src={value} alt="" className="h-20 w-20 rounded-lg object-cover ring-1 ring-line" />}
          <input type="hidden" name={name} defaultValue={value ?? ""} />
          <ImageInput name={`${name}__file`} />
        </div>
        {value && <p className="mt-1 text-xs font-normal text-subtle">Choose a new file only if you want to replace it.</p>}
      </div>
    );
  }

  return (
    <Label label={label} required={required}>
      {type === "select" ? (
        <select name={name} defaultValue={value ?? field.options[0].value} required={required} className={inputClass}>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea name={name} defaultValue={value ?? ""} rows={5} required={required} className={inputClass} />
      ) : (
        <input
          type={type}
          name={name}
          defaultValue={value ?? (type === "date" ? new Date().toISOString().slice(0, 10) : "")}
          required={required}
          className={inputClass}
        />
      )}
    </Label>
  );
}
