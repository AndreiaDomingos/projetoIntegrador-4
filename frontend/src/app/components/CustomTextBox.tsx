import React from 'react';

interface CustomTextBoxProps {
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}

{/* ORIGINAL <input name="medicamento" placeholder="Medicamento" value={form.medicamento} onChange={handleChange}
          className="w-full border border-gray-300 text-gray-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" required />*/}

export default function CustomTextBox({
  name,
  placeholder,
  value,
  onChange,
  required = false,
  type = "text",
}: CustomTextBoxProps) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      type={type}
      className="w-full border border-gray-300 text-gray-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  );
}