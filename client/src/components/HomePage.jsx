import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigator = useNavigate();
  const [docData, setDocData] = useState([]);

  const handleCreateDoc = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL_PROD}/createDocumentID`)
      .then((response) => {
        const docId = response.data.docId;
        navigator(`/${docId}`);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/`)
      .then((res) => {
        setDocData(res.data?.docData);
      })
      .catch((error) => console.log(error));
  }, []);

  const onDeleteDoc = (docId) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/${docId}/delete`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // acknowledged is true if doc is deleted
        if (data?.acknowledged) {
          setDocData(docData.filter((doc) => doc.docId !== docId));
        }
      });
  };

  console.log(docData);
  return (
    <main className=" flex flex-col items-center gap-12 bg-white pb-4 pt-8 dark:bg-[#323335]">
      <h1 className=" text-center text-6xl font-extrabold leading-normal text-[#0b1025] dark:text-white">
        Crafting Seamless <br /> Thoughts
      </h1>
      <h3 className="text-primary text-center text-2xl ">
        Streamline Ideas, Personalize Thoughts, and Achieve More <br /> - All in
        One Hub
      </h3>
      <button
        onClick={handleCreateDoc}
        className="hover:bg-primary border-secondary text-primary flex border-4 bg-white p-4 transition-colors duration-200 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="mr-2 h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
        Create New Doc
      </button>
      <section className="flex w-full flex-col items-center">
        <iframe
          width="1200px"
          height="600px"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=Ol2Q_1QYB8JLxXs-"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
          className="h-72 w-72 rounded-lg lg:h-[800px] lg:w-[70%] "
        ></iframe>
        <h3 className="mt-4 text-center text-2xl dark:text-white">
          How it works
        </h3>
      </section>
      <section className="space-y-4">
        <h3 className="dark:text-primary text-2xl">
          Check your or other people notes
        </h3>
        {docData?.map((doc) => (
          <div
            key={doc.docId}
            className=" flex justify-between rounded-lg border-y-2 bg-[#f5f7f7] p-2 "
          >
            {doc.docName}
            <div className="space-x-2">
              <span
                onClick={() => navigator(`${doc.docId}`)}
                className="cursor-pointer text-green-600"
              >
                Open
              </span>
              <span
                onClick={() => onDeleteDoc(doc.docId)}
                className="cursor-pointer text-red-600"
              >
                Delete
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};
export default HomePage;
