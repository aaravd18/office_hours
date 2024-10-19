import React from "react";

export default function NewNoteButton({ className }) {
  return (
    <button
      className={
        "text-white text-center text-8xl aspect-square w-56 bg-gray-400 rounded-xl  shadow shadow-lg " +
        className
      }
    >
      +
    </button>
  );
}
