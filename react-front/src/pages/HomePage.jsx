import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NewNoteButton from "../components/NewNoteButton";
import NoteIcon from "../components/NoteIcon";
import Modal from "../components/Modal";
import { CreateNote } from "../components/Menus";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function HomePage() {
  const [modalToggle, setModalToggle] = useState(false);
  const [notes, setNotes] = useState([]);
  const authVariables = useAuth();
  var docRef = doc(db, authVariables.currentUser.email, "notes");

  async function startNewNote() {}

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
      setNotes(result.split(","));
    });
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Modal toggle={modalToggle}>
        <CreateNote />
      </Modal>
      <Navbar />
      <div className="w-fit h-fit flex flex-row flex-wrap portrait:flex-col m-auto">
        <NewNoteButton className="m-3" />
        {notes.map((note) => {
          return (
            <NoteIcon key={note} className="m-3">
              {note}
            </NoteIcon>
          );
        })}
      </div>
    </div>
  );
}
