import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function ExamPage({ className, toggle, name, getData }) {
  const [questions, setQuestions] = useState({});
  return (
    <div
      className={
        "w-full h-full flex flex-col absolute top-0 left-0 border-t-2 " +
        className
      }
    >
      {/* <Navbar /> */}
      <div className="w-full pt-5 px-10 text-2xl flex flex-row">
        <h1 className="grow"></h1>
        <button
          onClick={() => {
            toggle();
          }}
        >
          X
        </button>
      </div>
      <div className="mx-auto text-4xl flex flex-row">
        <h1 className="mr-2 text-blue-600"> {name} </h1>
        <h1>Exam </h1>
      </div>
      <main className="w-full grow flex flex-col">
        <button
          className="w-fit m-auto p-2 bg-blue-600 text-white rounded-md"
          onClick={() => {
            getData();
          }}
        >
          Regenerate
        </button>
      </main>
    </div>
  );
}
