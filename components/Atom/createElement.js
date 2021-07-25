import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Select from "../../components/Atom/select";
import firebase from "../../lib/firebase";

const db = firebase.firestore();

export default function CreateElement({ item }) {
  const [modules, loading] = useCollectionData(db.collection("Modules"), {
    idField: "Id",
  });
  switch (item.type) {
    case "textarea":
      return (
        <textarea
          id="message"
          name="message"
          rows={item.rows || 2}
          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
          aria-describedby="message-max"
          defaultValue={""}
        />
      );
    case "select":
      return <Select options={item.options} button={item.button} />;
    case "modules":
      return <Checkboxes options={modules} loading={loading} />;
    default:
      return (
        <input
          type="text"
          name="first_name"
          id="first_name"
          autoComplete="given-name"
          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      );
  }
}

function Checkboxes({ options = [], loading }) {
  const [active, setActive] = useState([]);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
        {options.map((item) => {
          item.active = active.find(id => id === item.Id);
          return (
            <div
              className={`col-span-1 flex justify-center py-8 px-8 bg-gray-50 border border-gray-200 hover:border-teal-400 ${
                item.active ? "border-teal-600" : null
              }`}
              onClick={() => {
                if(item.active) {
                  setActive(active.filter(fil => fil !== item.Id))
                }
                setActive([...active, item.Id]);
              }}
            >
              {item.Name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
