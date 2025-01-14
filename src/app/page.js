"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";
import { db, auth } from "/Users/gelo/Desktop/SQ/apptracker/firebase";
import SignOut from "@/components/logout";

export default function Home() {
  /* Initiates the states and their default values */
  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(false); // Control modal visibility
  const [jobName, setJobName] = useState("");
  const [jobUrl, setJobUrl] = useState("");

  // Fetch applications from Firestore when the component mounts
  useEffect(() => {
    const fetchApplications = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const q = query(
            collection(db, "applications"),
            where("uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          const fetchedApplications = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setApplications(fetchedApplications);
        } catch (error) {
          console.error("Error fetching applications:", error);
        }
      }
    };

    fetchApplications();
  }, []);

  // Handles form submission so when form is submitted for the data
  // the function below is called and creates and pushes to the array of data

  const handleAddApplication = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user && jobName && jobUrl) {
      try {
        await addDoc(collection(db, "applications"), {
          uid: user.uid,
          jobName,
          jobUrl,
          dateAdded: new Date().toLocaleDateString(),
        });
        console.log("Document successfully written!");

        const q = query(
          collection(db, "applications"),
          where("uid", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);
        const fetchApplications = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setApplications(fetchApplications);

        // Reset inputs
        setJobName("");
        setJobUrl("");
        setShowForm(false);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  // returns what will be displayed on the site
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="flex justify-end">
        <SignOut />
      </div>
      <main className="grid grid-rows-2 gap-6">
        {/* Row 1: Header */}
        <div className="flex justify-center">
          <div className="flex items-center justify-between bg-slate-200 text-gray-700 p-6 rounded-lg shadow-md w-2/6">
            <div className="flex items-inline gap-4">
              <p className="text-3xl font-bold">{applications.length}</p>
              <h1 className="text-3xl font-bold">Applications</h1>
            </div>

            <button
              onClick={() => setShowForm(true)} // Toggle modal visibility
              className="bg-white text-green-600 font-bold text-2xl p-2 rounded-full hover:bg-blue-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Row 2: Job Applications List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {applications.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-400">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    URL
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Company Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Date Added
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition duration-150 "
                  >
                    <td className="border border-gray-300 px-4 py-2 text-blue-500 underline">
                      <a
                        href={app.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Job
                      </a>
                    </td>
                    <td className="border border-gray-300 text-black px-4 py-2">
                      {app.jobName}
                    </td>
                    <td className="border text-black  border-gray-300 px-4 py-2">
                      {app.dateAdded}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 flex justify-center">
              No applications submitted yet.
            </p>
          )}
        </div>
        <footer>
          <div className="text-black">
            <h1>By Angelo Boggio, Something useful for me.</h1>
          </div>
        </footer>
      </main>

      {/* Modal for Adding Applications */}
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <h2 className="text-xl font-bold mb-4 text-black">
            Add New Application
          </h2>
          <form onSubmit={handleAddApplication} className="space-y-4">
            <div>
              <label className="block text-lg text-black font-medium"></label>
              <input
                type="text"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
                className="w-full p-2 border rounded text-black"
                placeholder="Enter Company Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Job URL</label>
              <input
                type="url"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                className="w-full p-2 border rounded text-black"
                placeholder="Enter job URL"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
