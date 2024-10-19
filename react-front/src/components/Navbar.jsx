import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const authValues = useAuth();
  return (
    <div className="w-full h-max px-4 py-2 flex flex-row flex-nowrap text-2xl">
      <h2 className="my-auto grow self-center">Office Hours</h2>
      {authValues.currentUser == null ? (
        <a
          className="my-auto px-2 rounded-md bg-blue-500 text-white"
          href="/signup"
        >
          Sign Up
        </a>
      ) : (
        <h2>{authValues.currentUser.email}</h2>
      )}
    </div>
  );
}
