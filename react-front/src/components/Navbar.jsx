import React from "react";
import { useAuth } from "../contexts/AuthContext";
import oh_logo from './images/image.png'

export default function Navbar() {
  const authValues = useAuth();
  return (
    <div className="w-full h-max px-4 py-2 flex flex-row flex-nowrap text-2xl">
      <a className="text-left my-auto" href = "/">
        <img src = {oh_logo} className="transition ease-in-out delay-50 hover:-translate-x--1 hover:scale-105 hover:border-sky-500 duration-300 size-30 w-60 border-2 border-blue-300 rounded-full shadow-xl"/>
      </a>
      <input placeholder="..."
      className="text-left indent-3 mr-5 my-auto mx-auto px-15 border-4 border-blue-300 hover:border-blue-500 hover: duration-200 rounded-full drop-shadow-lg">
        
      </input>
      {authValues.currentUser == null ? (
        <a
          className="transition ease-in-out delay-50 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-sky-500 duration-300 my-auto px-3 rounded-md bg-blue-500 text-white mx-auto mr-12 drop-shadow-lg"
          href="/signup"
        >
          Sign Up
        </a>
      ) : (
        <button
          className="transition ease-in-out delay-50 bg-blue-500 hover:-translate-y-1 hover:scale-90 hover:bg-rose-500 duration-300 my-auto px-3 rounded-md bg-blue-500 text-white mx-auto mr-12 drop-shadow-lg"
          onClick={() => {
            authValues.logOut();
          }}
        >
          Log Out
        </button>
      )}
    </div>
  );
}
