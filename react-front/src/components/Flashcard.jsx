import React, { useState } from "react";
import ReactDOM from "react-dom";
import { get } from "firebase/database";
import "../css/card_animation.css";
import edit_icon from "./images/edit_icon.png";
import flip_icon from "./images/flip_icon.png";

export default function Flashcard({
  topic,
  content,
  deleteFunction,
  updateFunction,
  mutable,
}) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="w-max h-max mainContainer mx-5 my-14">
      <div
        className={"w-80 h-96" + (toggle ? " showingBack" : " showingFront")}
        onClick={() => {
          // setToggle(!toggle);
        }}
      >
        <Front
          topic={topic}
          toggleFunction={() => {
            setToggle(!toggle);
          }}
          deleteFunction={deleteFunction}
          updateFunction={updateFunction}
          mutable={mutable}
        />
        <Back
          content={content}
          toggleFunction={() => {
            setToggle(!toggle);
          }}
          deleteFunction={deleteFunction}
          updateFunction={updateFunction}
          mutable={mutable}
        />
      </div>
    </div>
  );
} //end of main component

// supplemental functions below
function Front({
  topic,
  deleteFunction,
  updateFunction,
  toggleFunction,
  mutable,
}) {
  return (
    <div
      className="bg-blue-300 rounded-lg border-2 border-black w-full h-full p-3 flex flex-col front relative"
      draggable
    >
      <div className="text-5xl h-7 w-full self-center flex flex-row-reverse z-30 center">
        {mutable ? (
          <>
            <button
              className="text-slate-700 font-bold text-3xl w-7 h-7 rounded-full flex items-center justify-center" //bg-red-600
              onClick={deleteFunction}
            >
              x
            </button>
            <button
              className="text-slate-700 font-bold text-2xl w-7 h-7 mr-3 rounded-full " //bg-blue-600
              onClick={updateFunction}
            >
              <img src={edit_icon} className="w-full" />
            </button>
          </>
        ) : (
          ""
        )}
        <button
          className="text-slate-700 font-bold text-3xl w-7 h-7 mr-auto ml-2 rounded-full flex items-center justify-center"
          onClick={toggleFunction}
        >
          <img src={flip_icon} className="w-full" />
        </button>
      </div>
      <div
        className="w-full h-full p-3 text-4xl text-center absolute top-0 left-0"
        onClick={toggleFunction}
      >
        <h1 className="mx-auto my-14">{topic}</h1>
      </div>
    </div>
  );
}

function Back({
  content,
  deleteFunction,
  updateFunction,
  toggleFunction,
  mutable,
}) {
  return (
    <div
      className="bg-blue-300 rounded-lg border-2 border-black w-full h-full p-3 flex flex-col back relative"
      draggable
    >
      <div className="text-5xl h-7 w-full self-center flex flex-row-reverse z-30 center">
        {mutable ? (
          <>
            <button
              className="text-slate-700 font-bold text-3xl w-7 h-7 rounded-full flex items-center justify-center" //bg-red-600
              onClick={deleteFunction}
            >
              X
            </button>
            <button
              className="text-slate-700 font-bold text-2xl w-7 h-7 mr-3 rounded-full " //bg-blue-600
              onClick={updateFunction}
            >
              <img src={edit_icon} className="w-full" />
            </button>
          </>
        ) : (
          ""
        )}
        <button
          className="text-slate-700 font-bold text-3xl w-7 h-7 mr-auto ml-2 rounded-full flex items-center justify-center"
          onClick={toggleFunction}
        >
          <img src={flip_icon} className="w-full" />
        </button>
      </div>
      <div
        className="w-full h-full p-3 text-2xl text-center absolute top-0 left-0"
        onClick={toggleFunction}
      >
        <h1 className="mx-auto my-16">{content}</h1>
      </div>
    </div>
  );
}
