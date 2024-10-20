import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Flashcard from "../components/Flashcard";
import TestWindow from "../components/TestWindow";
import refresh_icon from "../components/images/reload.png";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function ExamPage({ className, toggle, name, rawText }) {
  const [pairs, setPairs] = useState({ questions: [""], answers: [""] });
  const [choice, setChoice] = useState(null);
  const authValues = useAuth();

  useEffect(() => {
    // if (!tryFirebase()) {
    //   return;
    // }
    createExamJSON();
    const fetchData = async () => {
      const data = await getExamJSON();
      setPairs(data);
      // const docRef = doc(
      //   db,
      //   authValues.currentUser.email,
      //   "notes",
      //   name,
      //   "study_data"
      // );
      // await setDoc(docRef, data);
    };
    fetchData();
  }, []);

  //checks if study data is on firebase
  //returns true if yes, false if not
  async function tryFirebase() {
    console.log("inside tryFirebase");
    try {
      const docRef = doc(
        db,
        authValues.currentUser.email,
        "notes",
        name,
        "study_data"
      );
      var data = (await getDoc(docRef)).data();
      console.log(data);
      if (data === undefined) {
        console.log(pairs);
        return false;
      } else {
        await setPairs(data.quiz);
        console.log(pairs);
        return true;
      }
    } catch (err) {
      console.error(err);
    }
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
          className="align-middle transition ease-in-out delay-25 hover:scale-110 bg-transparent rounded-lg self-center"
          onClick={() => {}}
        >
          <img src={refresh_icon} className="w-5" />
        </button>
        <button
          className="align-middle transition ease-in-out delay-25 hover:scale-110 bg-transparent hover:bg-rose-500 duration-300 w-8 mx-auto my-auto text-black hover:text-white rounded-lg"
          onClick={() => {
            toggle();
          }}
        >
          x
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
              <div className="">
                {name.includes("Genetics Day One") ? (
                  <div>
                    <h2 className="text-xl font-bold mb-4">
                      Genetics Study Notes Summary
                    </h2>

                    <ul className="list-disc list-inside">
                      <li>
                        <strong>Gene</strong>: A DNA segment that codes for a
                        specific protein and influences traits.
                      </li>
                      <li>
                        <strong>Allele</strong>: Different versions of a gene;
                        for example, alleles for eye color can be blue, green,
                        or brown.
                      </li>
                      <li>
                        <strong>Genotype</strong>: The genetic makeup of an
                        individual, formed from alleles inherited from both
                        parents.
                      </li>
                      <li>
                        <strong>Phenotype</strong>: The physical characteristics
                        resulting from the genotype, affected by genes and the
                        environment.
                      </li>
                      <li>
                        <strong>Homozygous</strong>: Having two identical
                        alleles for a gene (e.g., AA or aa).
                      </li>
                      <li>
                        <strong>Heterozygous</strong>: Having two different
                        alleles for a gene (e.g., Aa).
                      </li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-4">
                      Mendelian Genetics
                    </h3>
                    <ul className="list-disc list-inside">
                      <li>
                        <strong>Law of Segregation</strong>: Each parent passes
                        one allele for each gene to the offspring.
                      </li>
                      <li>
                        <strong>Law of Independent Assortment</strong>: Genes
                        for different traits are inherited independently.
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-bold mb-4">
                      Physics 101 - Thermodynamics
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Date: 2022-09-12
                    </p>

                    <h3 className="text-lg font-semibold mt-4">
                      Thermodynamics
                    </h3>
                    <ul className="list-disc list-inside">
                      <li>
                        <strong>Temperature (T)</strong>: T = Kinetic Energy /
                        Boltzmann Constant (K<sub>b</sub>)
                      </li>
                      <li>
                        <strong>Internal Energy (U)</strong>: U = TΔS - W
                      </li>
                      <li>
                        <strong>Heat Capacities (C)</strong>: C = ∂Q / ∂T |
                        <sup>vib</sup> |<sup>rot</sup>
                      </li>
                      <li>
                        <strong>Latent Heat (L)</strong>: L = Q<sub>mol</sub> /
                        n
                      </li>
                      <li>
                        <strong>
                          Molar Heat Capacity (C<sub>p</sub>)
                        </strong>
                        : C<sub>p</sub> = ΔH / nΔT
                      </li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-4">
                      Properties of Metals
                    </h3>
                    <ul className="list-disc list-inside">
                      <li>
                        <strong>Conductor</strong>: σ = 10<sup>5</sup> - 10
                        <sup>8</sup> (ohm<sup>-1</sup>m<sup>-1</sup>)
                      </li>
                      <li>
                        <strong>Semiconductor</strong>: σ = 10<sup>-4</sup> - 10
                        <sup>4</sup> (ohm<sup>-1</sup>m<sup>-1</sup>)
                      </li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-4">Equations</h3>
                    <ul className="list-disc list-inside">
                      <li>ΔU = ΔQ + ΔW</li>
                      <li>
                        ΔH = ΔU + Δ(W<sub>work</sub>)
                      </li>
                      <li>ΔS = ΔQ / T</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : choice == 0 ? (
              <>
                <TestWindow
                  questions={pairs.questions}
                  answers={pairs.answers}
                />
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
