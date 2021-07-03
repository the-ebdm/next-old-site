import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "../../lib/firebase";
import Link from "next/link";
import Form from "../../components/Molecule/form";
import Header from "../../components/Atom/header";

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

export default function Terraformation({}) {
  const [projects] = useCollectionData(db.collection("Projects"), {
    idField: "Id",
  });
  return (
    <>
      <div className="mt-12 mx-auto max-w-7xl px-4 sm:mt-24">
        <Header title="Terraformation" />
        <Form title="Add a Project" schema={addProject} type="save" />
        <Table data={projects || []} />
      </div>
    </>
  );
}

function Table({ data }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md my-4">
      <ul className="divide-y divide-gray-200">
        {data.map((item) => {
          const { Id, Name, Description, Source, Infrastructure = [] } = item;
          return (
            <li key={Id}>
              <Link href={`/terraformation/${Id}`} passHref={true}>
                <a href="" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-md text-teal-600 truncate">{Name}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        {Infrastructure.map((item) => (
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {item?.Type}
                          </p>
                        ))}
                        { Source ? (
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {Source?.Provider}
                        </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="px-2 inline-flex text-sm leading-5 font-light rounded-full bg-green-100 text-green-800">
                          {Description}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
