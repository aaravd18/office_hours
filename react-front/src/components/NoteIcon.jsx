import React from "react";
import { useNavigate } from "react-router-dom";

export default function NoteIcon({ children, className, image }) {
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
      <img src = {image} className= ""/>
      <div className="w-full h-fit bg-gray-400 text-center text-white z-40">
        {children}
      </div>
    </button>

  );
}