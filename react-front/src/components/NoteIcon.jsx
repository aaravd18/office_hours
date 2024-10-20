import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NoteIcon({ children, className, image, date }) {
  const [d, setD] = useState(date);

  const navigate = useNavigate();

  function redirectToNote() {
    navigate("/note/" + children);
  }

  return (
    <button
      className={
        "border-4 border-blue-300 transition ease-in-out delay-25 hover:-translate-y-1 hover:scale-90 hover:bg-sky-300 duration-300 aspect-square w-56 overflow-hidden bg-gray-200 rounded-xl flex flex-col shadow-lg relative " +
        className
      }
      onClick={() => {
        redirectToNote();
      }}
    >
      <h3 className="absolute bottom-0 self-center">{d + ""}</h3>
      <img src={image} className="m-auto self-center" />
      <div className="w-full h-fit bg-gray-400 text-center text-white z-40">
        {children}
      </div>
    </button>
  );
}
