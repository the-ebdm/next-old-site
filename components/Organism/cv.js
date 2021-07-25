import { useEffect, useState } from "react";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { InlineWidget } from "react-calendly";
import { useCollectionDataOnce, useDocumentDataOnce } from "react-firebase-hooks/firestore";
import firebase from "../../lib/firebase";
import { GithubContributions } from "react-github-graph"
import useSWR from "swr";
import axios from "axios";

const db = firebase.firestore();

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const idify = (string) =>
  string.split(" ").join("").toLowerCase().replace(/\W/g, "");

export default function CurriculumVitae({
  size = "lg",
  remoteConfig,
  imgClass = "",
}) {
  const [profile, setProfile] = useState(null);
  const [projects, loading, error] = useCollectionDataOnce(
    db.collection("Projects"),
    {
      idField: "id",
    }
  );
  const [contact, loadingContact, contactError] = useDocumentDataOnce(db.collection("Contacts").doc('eric'));
  useEffect(() => {
    if (remoteConfig !== null) {
      setProfile(JSON.parse(remoteConfig.getValue("cvprofile")._value));
    }
  }, [remoteConfig]);
  useEffect(() => {
    if(contact) {
      console.error(contact)
    }
    if(contactError) {
      console.error(contactError)
    }
    if(loadingContact) {
      console.error(loadingContact)
    }
  }, [contact, loadingContact, contactError]);
  const [tabs, setTabs] = useState([
    { name: "Profile", href: "#", current: true },
    { name: "Experience", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
  ]);
  if (profile === null) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className={`${
        size === "lg" ? "" : "h-3/4 py-4 md:pt-0"
      } flex overflow-hidden mb-8`}
    >
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            <article>
              {/* Profile header */}
              <div>
                <div>
                  <img
                    className={`${
                      size === "lg"
                        ? "h-32 lg:h-48"
                        : "hidden md:block lg:h-32 h-16 mx-auto"
                    } w-full object-cover ${imgClass}`}
                    src={profile.coverImageUrl}
                    alt=""
                  />
                </div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div
                    className={`${
                      size === "lg" ? "-mt-16" : "md:-mt-10 xl:-mt-16"
                    } sm:flex sm:items-end sm:space-x-5`}
                  >
                    <div className="flex">
                      <img
                        className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                        src={profile.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                      <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                        <Link href="/cv">
                          <h1 className="text-2xl font-bold text-gray-900 truncate">
                            {profile.name}
                          </h1>
                        </Link>
                      </div>
                      <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                          <MailIcon
                            className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Message</span>
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                          <PhoneIcon
                            className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Call</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 truncate">
                      {profile.name}
                    </h1>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              {size === "lg" ? (
                <div className="mt-6 sm:mt-2 2xl:mt-5">
                  <div className="border-b border-gray-200">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                          <a
                            key={tab.name}
                            href={tab.href}
                            className={classNames(
                              tab.current
                                ? "border-teal-500 text-gray-900"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                              "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                            )}
                            aria-current={tab.current ? "page" : undefined}
                            onClick={() => {
                              setTabs([
                                ...tabs.map((item) => {
                                  if (item.name === tab.name) {
                                    item.current = true;
                                  } else {
                                    item.current = false;
                                  }
                                  return item;
                                }),
                              ]);
                            }}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Description list */}
              {tabs[0].current === true ? (
                <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    {Object.keys(profile.fields).map((field) => (
                      <div
                        key={field}
                        className={
                          typeof profile.fields[field] === "object"
                            ? "sm:col-span-2"
                            : "sm:col-span-1"
                        }
                      >
                        <dt className="text-sm font-medium text-gray-500">
                          {field}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {typeof profile.fields[field] === "object" ? (
                            <GithubContributions username={profile.fields[field].username} />
                          ) : (
                            profile.fields[field]
                          )}
                        </dd>
                      </div>
                    ))}
                    <div
                      className={`sm:col-span-2 ${
                        size === "lg" ? null : "hidden md:block"
                      }`}
                    >
                      <dt className="text-sm font-medium text-gray-500">
                        About
                      </dt>
                      <dd
                        className="mt-1 max-w-prose text-sm text-gray-900 space-y-5"
                        dangerouslySetInnerHTML={{ __html: profile.about }}
                      />
                    </div>
                  </dl>
                </div>
              ) : null}

              {/* Projects list */}
              {size === "lg" && tabs[0].current === true ? (
                <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
                  <h2 className="text-sm font-medium text-gray-500 mb-3">
                    Projects
                  </h2>
                  <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {loading ? (
                      <div>Loading...</div>
                    ) : (
                      <>
                        {projects.map((project) => (
                          <div
                            key={project.id}
                            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                          >
                            <div className="flex-shrink-0">
                              {/* <img
                                className="h-10 w-10 rounded-full"
                                src={person.imageUrl}
                                alt=""
                              /> */}
                            </div>
                            <div className="flex-1 min-w-0">
                              <a href="#" className="focus:outline-none">
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                <p className="text-sm font-medium text-gray-900">
                                  {project.Name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {project.Description}
                                </p>
                              </a>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              ) : null}

              {/* Experiance */}
              {tabs[1].current === true ? (
                <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    {profile.experiences.map((exp) => {
                      exp.id = idify(`${exp.title} ${exp.company}`);
                      return (
                        <div key={exp.id} className={"sm:col-span-2"}>
                          <dt className="text-sm font-medium text-gray-500">
                            {exp.title} - {exp.company}
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {exp.description}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              ) : null}

              {/* Meeting Invite */}
              {tabs[2].current === true ? (
                <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div
                      className={`sm:col-span-2 ${
                        size === "lg" ? null : "hidden md:block"
                      }`}
                    >
                      <dt className="text-sm font-medium text-gray-500 text-center mx-auto mb-10">
                        Book a meeting with me:
                      </dt>
                      <dd className="mt-1 max-w-prose text-sm text-gray-900 space-y-5 mx-auto">
                        <InlineWidget url="https://calendly.com/ebdm" />
                      </dd>
                    </div>
                  </dl>
                </div>
              ) : null}
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
