import React, { useState } from "react";

export default function Searchbar() {
  const [results, setResults] = useState([]);
  function getResults(search) {
    if (search.length == 0) setResults([]);
    if (search.length > 0)
      setResults(["Cellular Biology", "Bioengineering", "Bio Human Anatomy"]);
    if (search.length > 4) setResults(["Cellular Biology", "Bioengineering"]);
    if (search.length > 7) setResults(["Bioengineering"]);
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
      <div className="w-full absolute top-14 flex flex-col text-lg text-center">
        {results.map((result) => {
          return (
            <a className="mx-auto text-nowrap" href={"note/" + result}>
              {result}
            </a>
          );
        })}
      </div>
    </div>
  );
}
