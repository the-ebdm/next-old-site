import { useState } from "react";

export default function Input({
  name,
  value,
  label,
  type = "text",
  color = "accent",
  placeholder,
  setValue,
  appendClassDiv,
  showLabel = true,
}) {
  const id = name.toLowerCase().split(" ").join("-");
  return (
    <div className={appendClassDiv}>
      {showLabel ? (
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {label || name}
        </label>
      ) : (
        <></>
      )}
      {type !== "textarea" ? (
        <div className="mt-1">
          <input
            type={type}
            name={id}
            id={id}
            defaultValue={value}
            className={`shadow-sm focus:ring-${color}-500 focus:border-${color}-500 block w-full sm:text-sm border-gray-300 rounded-md`}
            placeholder={placeholder || name}
            onChange={(event) => {
              if (typeof setValue === "function") {
                setValue(event.target.value);
              }
            }}
          />
        </div>
      ) : (
        <div className="mt-1">
          <textarea
            name={id}
            id={id}
            value={value}
            className={`shadow-sm block w-full focus:ring-${color}-500 focus:border-${color}-500 sm:text-sm border-gray-300 rounded-md`}
            defaultValue={value}
            placeholder={placeholder || name}
            onChange={(event) => {
              if (typeof setValue === "function") {
                setValue(event.target.value);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
