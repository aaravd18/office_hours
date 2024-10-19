import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const authValues = useAuth();
  return (
    
    <div className="w-full h-max px-4 py-2 flex flex-row flex-nowrap text-2xl">
      <h2 className="text-left my-auto">Office Hours</h2>
      <input
      className="text-left mr-5 my-auto mx-auto px-15 border-4 border-blue-300 hover:border-blue-500 hover: duration-200 rounded-full drop-shadow-lg">
        
      </input>
      {authValues.currentUser == null ? (
        <a
          className="my-auto px-2 rounded-md bg-blue-500 text-white mr-10"
          href="/signup"
        >
          Sign Up
        </a>
      ) : (
        <button
          className="transition ease-in-out delay-50 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-rose-500 duration-300 my-auto px-3 rounded-md bg-blue-500 text-white mx-auto mr-12 drop-shadow-lg"
          onClick={() => {
            authValues.logOut();
          }}
        >
          Log Out
        </button>
        // <h2>{authValues.currentUser.email}</h2>
      )}
    </div>
  );
}


