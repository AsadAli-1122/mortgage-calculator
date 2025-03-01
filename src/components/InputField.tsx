import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type?: "text" | "number" | "email" | "password";
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  symbol?: string;
  symbolPosition?: "left" | "right";
  required?: boolean;
  error?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  symbol,
  symbolPosition = "left",
  error,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={id}
        className="capitalize block text-gray-700 w-fit cursor-pointer"
      >
        {label}
      </label>
      <div
        className={`flex items-center border-2 ${
          error
            ? "border-[var(--red)]"
            : "border-[var(--sky)] focus-within:border-[var(--lime)]"
        }  rounded-sm overflow-hidden focus-within:outline-none duration-200 ease-in-out group mt-2`}
      >
        {symbol && symbolPosition === "left" && (
          <span
            className={`${
              error
                ? "bg-[var(--red)] text-white"
                : "bg-[var(--sky)] text-gray-600 group-focus-within:bg-[var(--lime)]"
            } px-4 lg:px-6 py-2 font-semibold duration-200 ease-in-out`}
          >
            {symbol}
          </span>
        )}
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 focus:outline-none font-semibold"
        />
        {symbol && symbolPosition === "right" && (
          <span
            className={`${
              error
                ? "bg-[var(--red)] text-white"
                : "bg-[var(--sky)] text-gray-600 group-focus-within:bg-[var(--lime)]"
            } px-4 lg:px-6 py-2 font-semibold duration-200 ease-in-out`}
          >
            {symbol}
          </span>
        )}
      </div>
      {error && <p className="text-[var(--red)] text-sm mt-1 tracking-wider">{error}</p>}
    </div>
  );
};

export default InputField;
