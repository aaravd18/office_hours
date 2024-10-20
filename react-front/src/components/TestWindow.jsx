import React, { useState } from "react";

export default function TestWindow({ questions, answers }) {
  const [index, setIndex] = useState(0);
  const sequence = [];
  return (
    <div className="w-fit h-fit flex flex-col">
      <div className="flex flex-row">
        <h1>{questions[index]}</h1>
        <h1>{answers[index]}</h1>
        <button
          className="mx-auto"
          onClick={() => {
            if (index - 1 < questions.length) setIndex(index - 1);
          }}
        >
          Back
        </button>
        <button
          className="mx-auto"
          onClick={() => {
            if (index + 1 < questions.length) setIndex(index + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
