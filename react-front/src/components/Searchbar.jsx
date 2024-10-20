import React, { useState } from "react";

export default function Searchbar() {
  const [results, setResults] = useState([]);
  function getResults(search) {
    if (search.length == 0) setResults([]);
    if (search.length > 0)
      setResults([
        "Fake Nonsense Class",
        "These Are Made Up Notes",
        "Never Happened Lecture",
      ]);
    if (search.length > 5)
      setResults(["Fake Nonsense Class", "These Are Made Up Notes"]);
    if (search.length > 10) setResults(["These Are Made Up Notes"]);
  }
  return (
    <div className="w-max mr-5 mx-auto flex flex-col relative">
      <input
        placeholder=". . ."
        onChange={(e) => {
          getResults(e.target.value);
        }}
        className="text-center indent-3 mx-auto my-auto px-15 border-4 border-blue-300 hover:border-blue-500 hover: duration-200 rounded-full drop-shadow-lg"
      />
      <div className="w-full absolute top-14 text-xl text-center">
        {results.map((result) => {
          return (
            <a className="mx-auto" href={"note/" + result}>
              {result}
            </a>
          );
        })}
      </div>
    </div>
  );
}
