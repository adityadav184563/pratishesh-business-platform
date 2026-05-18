interface FormFieldProps {
  label: string
  name: string
  type?: string
  value: string | number | boolean
  onChange: (value: string) => void
  required?: boolean
  as?: "input" | "textarea" | "select"
  options?: { value: string; label: string }[]
  rows?: number
}

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  as = "input",
  options,
  rows = 3,
}: FormFieldProps) {
  const baseClass =
    "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"

  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        />
      ) : as === "select" ? (
        <select
          id={name}
          name={name}
          required={required}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        />
      )}
    </div>
  )
}
