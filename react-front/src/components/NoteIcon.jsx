import React from "react";
import { useNavigate } from "react-router-dom";

export default function NoteIcon({ children, className }) {
  const navigate = useNavigate();

  function redirectToNote() {
    navigate("/note/" + children);
  }

  return (
    <button
      className={
        "aspect-square w-56 overflow-hidden bg-gray-200 rounded-xl relative flex shadow shadow-lg " +
        className
      }
      onClick={() => {
        redirectToNote();
      }}
    >
      <embed
        src={"/note/" + children}
        className="w-full h-full pointer-events-none absolute left-0 top-0"
      />
      <div className="w-full h-fit bg-gray-400 text-center text-white z-40">
        {children}
      </div>
    </button>
  );
}
