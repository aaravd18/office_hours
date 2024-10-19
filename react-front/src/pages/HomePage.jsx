import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NewNoteButton from "../components/NewNoteButton";
import NoteIcon from "../components/NoteIcon";
import Modal from "../components/Modal";
import { CreateNote } from "../components/Menus";
import { useAuth } from "../contexts/AuthContext";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import chem_logo from '../components/images/chem.png';

export default function HomePage() {
  const [modalToggle, setModalToggle] = useState(false);
  const [notes, setNotes] = useState("");
  const authVariables = useAuth();
  const navigate = useNavigate();
  var docRef = doc(db, authVariables.currentUser.email, "notes");

  async function startNewNote() {
    var id = 1;
    var temp = "" + notes;
    while (temp.includes("untitled")) {
      var i = temp.indexOf("untitled");
      temp = temp.substring(0, i) + temp.substring(i + 8);
      console.log(temp);
      id++;
    }
    try {
      var newRef = collection(
        db,
        authVariables.currentUser.email,
        "note",
        "untitled" + id
      );
      setDoc(docRef, { all_names: notes + "," + "untitled" + id });
    } catch (err) {
      console.error(err);
      return;
    }
    navigate("note/untitled" + id);
  }

  async function getNotes() {
    var document = "failed to get notes";
    try {
      document = (await getDoc(docRef)).data().all_names;
    } catch (err) {
      console.error(err);
    }
    console.log(document);
    return document;
  }

  useEffect(() => {
    getNotes().then((result) => {
      setNotes(result);
    });
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Modal toggle={modalToggle}>
        <CreateNote />
      </Modal>
      <Navbar />
      <div className="w-fit h-fit flex flex-row flex-wrap portrait:flex-col m-auto">
        <NewNoteButton
          className="m-3"
          onClick={() => {
            startNewNote();
          }}
        />
        {notes.split(",").map((note) => {
          return (
            <NoteIcon key={note} className="m-3" image={chem_logo}>
              {note}
            </NoteIcon>
          );
        })}
      </div>
    </div>
  );
}
