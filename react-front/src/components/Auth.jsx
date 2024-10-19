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
        className="transition ease-in-out delay-50 bg-blue-500 hover:-translate-y-1 hover:scale-100 hover:bg-sky-500 duration-300 my-auto px-3 rounded-md bg-blue-500 text-white mx-auto drop-shadow-lg"
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
