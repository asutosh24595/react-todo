export default function Input({
  type,
  id,
  label,
  placeholder,
  onChange,
  value,
}) {
  return (
    <div className="w-full flex justify-between items-center gap-4">
      <label className="text-slate-100" htmlFor={id}>
        {label}{" "}
      </label>
      <input
        className="border-[2px] border-gray-400 p-1 w-1/2 rounded-md"
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
