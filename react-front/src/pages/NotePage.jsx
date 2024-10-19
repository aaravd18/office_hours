import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";

export default function NotePage() {
  const [text, setText] = useState("");
  const authVariables = useAuth();
  const { id } = useParams();
  var textRef = doc(db, authVariables.currentUser.email, "notes", id, "text"); //reference to text doc

  async function getText() {
    var document = "";
    try {
      document = (await getDoc(textRef)).data().text;
    } catch (err) {
      console.error(err);
    }
    console.log(document);
    return document;
  }

  function updateText() {
    console.log("text updated starting");
    try {
      setDoc(textRef, { text: text });
      console.log("text updated successfully");
    } catch (err) {
      console.error(err);
    }
  }

  //retrieves text from firebase on first render
  useEffect(() => {
    getText().then((result) => {
      setText(result);
    });
    console.log(text);
  }, []);

  //updates text in firebase when changed here
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (text) {
        updateText(text);
      }
    }, 1000);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [text]);

  return (
    <div className="w-screen h-screen">
      {/* <div className="w-full h-1/6 bg-gray-300 fixed top-0"></div>
      <div className="w-full h-1/6 bg-gray-300"></div> spacer */}
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        className="w-full h-full p-10 text-wrap overflow-y-auto resize-none border-none"
      />
    </div>
  );
}
