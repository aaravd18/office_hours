import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import reload_icon from "../components/images/reload.png";
import Flashcard from "../components/Flashcard";
import { db } from "../config/firebase";
import { doc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function ExamPage({ className, toggle, name, rawText }) {
  const [pairs, setPairs] = useState({ questions: [""], answers: [""] });
  const [choice, setChoice] = useState(null);
  const authValues = useAuth();

  useEffect(() => {
    createExamJSON();
    const fetchData = async () => {
      const data = await getExamJSON();
      setPairs(data);
    };
    fetchData();
  }, []);

  //checks if study daya is on firebase
  //creates it and stores it if not
  async function tryFirebase() {
    const docRef = doc(
      db,
      authValues.currentUser.email,
      "notes",
      name,
      "studyData"
    );
  }

  async function getExamJSON() {
    var response;
    //return json
    await fetch("http://localhost:3000/data")
      .then((res) => {
        return res.json();
      })
      .then((j) => {
        response = j;
      });
    return response;
  }

  async function createExamJSON() {
    console.log("burning deisel");
    createTxt();
    //post txt
    const url = "/rest/post";
    const data = { filename: "agents/raw_notes.txt" };
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function createTxt() {
    //create txt with note data
    const textContent = rawText;
    const blob = new Blob([textContent], { type: "text/plain" });
    const file = new File([blob], "raw_notes.txt", { type: "text/plain" });

    // Step 2: Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file); // 'file' is the key that the server will use to access the file

    // Step 3: Send the file to the server
    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div
      className={
        "w-full h-full flex flex-col absolute top-0 left-0 border-t-2 " +
        className
      }
    >
      <div className="w-full pt-5 px-10 text-2xl flex flex-row">
        <h1 className="grow"></h1>
        <button
          className="w-fit m-auto mr-5 p-2 bg-gray-400 text-white text-lg rounded-md"
          onClick={() => {}}
        >
          <img src={reload_icon.src} />
          <h1>Regenerate</h1>
        </button>
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
        {/* <h1>Exam </h1> */}
      </div>
      <main className="w-full grow flex flex-col">
        <div className="my-10 w-full flex flex-row">
          <button
            onClick={() => {
              setChoice(-1);
            }}
            className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400 duration-300 my-auto p-2 rounded-md bg-blue-500 text-white mx-auto drop-shadow-lg"
          >
            Summary
          </button>
          <button
            onClick={() => {
              setChoice(0);
            }}
            className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400 duration-300 my-auto p-2 rounded-md bg-blue-500 text-white mx-auto drop-shadow-lg"
          >
            Practice Test
          </button>
          <button
            onClick={() => {
              setChoice(1);
            }}
            className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400 duration-300 my-auto p-2 rounded-md bg-blue-500 text-white mx-auto drop-shadow-lg"
          >
            Flashcards
          </button>
        </div>
        {/* Disgusting study choice selector */}
        <div className="mx-auto w-fit">
          {choice != null ? (
            choice == -1 ? (
              "summary"
            ) : choice == 0 ? (
              <>
                {pairs.questions.map((question) => {
                  var index = pairs.questions.indexOf(question);
                  return (
                    <div className="text-center">
                      <h1>{question}</h1>
                      <h1>{pairs.answers[index]}</h1>
                    </div>
                  );
                })}
              </>
            ) : choice == 1 ? (
              <>
                {pairs.questions.map((question) => {
                  var index = pairs.questions.indexOf(question);
                  return (
                    <Flashcard
                      key={index}
                      topic={question}
                      content={pairs.answers[index]}
                    />
                  );
                })}
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </main>
    </div>
  );
}
