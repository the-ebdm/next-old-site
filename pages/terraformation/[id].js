import { useCollectionData, useDocumentDataOnce } from "react-firebase-hooks/firestore";
import firebase from "../../lib/firebase";
import Header from "../../components/Atom/header";
import Form from "../../components/Molecule/form";
import { useRouter } from 'next/router'
import Link from "next/link";
import { useEffect } from "react";

const db = firebase.firestore();

const addProject = [
  {
    name: "Name",
    type: "text",
  },
  {
    name: "Description",
    type: "textarea",
  },
  {
    name: "Source Provider",
    type: "select",
    options: ["GitHub", "Bitbucket"],
  },
  {
    name: "Source Url",
    type: "text",
  },
];

export default function Project({setLoading}) {
  const router = useRouter()
  const [project, loading, error] = useDocumentDataOnce(db.collection("Projects").doc(router.query.id), {
    idField: "Id",
  })
  useEffect(() => {
    console.log(project, loading)
    if(typeof setLoading === "function") {
      setLoading(loading);
    }
  }, [project])
  useEffect(() => {
    if(error) {
      console.error(error);
    }
  }, [error])
  return (
    <>
      <div className="mt-12 mx-auto max-w-7xl px-4 sm:mt-24">
        <Header title={project?.Name} />
        {/* <Form title="Add a Project" schema={addProject} type="save" /> */}
      </div>
    </>
  );
}