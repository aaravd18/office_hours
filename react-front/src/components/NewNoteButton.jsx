import React from "react";

export default function NewNoteButton({ className, onClick }) {
  return (
    <button
      className={
        "text-center text-8xl aspect-square w-56 bg-gray-400 transition ease-in-out delay-25 bg-lightgray-500 hover:-translate-y-1 hover:scale-90 duration-300 my-auto rounded-md text-white mx-auto shadow-xl " +
        className
      }
      onClick={() => {
        onClick();
      }}
    >
      +
    </button>
  );
}
