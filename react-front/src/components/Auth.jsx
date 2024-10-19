import React, { useState } from "react";

export default function Auth({
  children,
  handSubmit,
  handleError,
  className = "",
  alt,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      className={
        "w-fit h-fit rounded-lg px-5 py-2 flex flex-col items-center bg-gray-200 " +
        className
      }
    >
      <h1 className="text-3xl">{children}</h1>
      <input
        className="my-2 px-1 rounded-md"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="my-2 px-1 rounded-md"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="my-2 p-2 rounded-lg bg-blue-500 text-white"
        onClick={() => {
          handSubmit(email, password);
        }}
      >
        {children}
      </button>
      {alt ? alt : ""}
    </div>
  );
}
