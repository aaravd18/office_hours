import React, { useState } from "react";

export default function TestWindow({ questions, answers }) {
  const [index, setIndex] = useState(0);
  const sequence = [];
  return (
    <div className="w-fit h-fit flex flex-col ">
      <h2 className="mx-auto my-5">Question</h2>
      <h1 className="mx-auto my-5 text-2xl">{questions[index]}</h1>
      <h2 className="mx-auto my-5">Answer</h2>
      <h1 className="mx-auto my-5 text-2xl">{answers[index]}</h1>
      <div className="my-10 flex flex-row">
        {index - 1 >= 0 ? (
          <button
            className="mx-auto p-2 rounded-md bg-gray-300 outline outline-1"
            onClick={() => {
              if (index - 1 >= 0) setIndex(index - 1);
            }}
          >
            Back
          </button>
        ) : (
          ""
        )}
        {index + 1 < questions.length ? (
          <button
            className="mx-auto p-2 rounded-md bg-gray-300 outline outline-1"
            onClick={() => {
              if (index + 1 < questions.length) setIndex(index + 1);
            }}
          >
            Next
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
