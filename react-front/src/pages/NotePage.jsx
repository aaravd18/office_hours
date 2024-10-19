import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import { Editor } from "@tinymce/tinymce-react";

export default function NotePage() {
  const [initialValue, setInitialValue] = useState("");
  const [text, setText] = useState("");
  const authVariables = useAuth();
  const { id } = useParams();
  var textRef = doc(db, authVariables.currentUser.email, "notes", id, "text"); //reference to text doc

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

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
      setInitialValue(result);
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
    <>
      <Navbar />
      <Editor
        apiKey="rncicr4pa0ungw5lzix98tz61buq6rodfdnx37txoh1hi0se"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        init={{
<<<<<<< HEAD
=======
          // setup: function (editor) {
          //   editor.on("input", () => {
          //     setText(editorRef.current.getContent());
          //   });
          // },
>>>>>>> 17070a4 (changes 4)
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
<<<<<<< HEAD
        onEditorChange={() => {
          setText(editorRef.current.getContent());
        }}
=======
>>>>>>> 17070a4 (changes 4)
      />
    </>
  );
}
