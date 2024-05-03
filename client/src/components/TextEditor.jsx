import axios from "axios";
import "quill/dist/quill.snow.css";
import Delta from "quill-delta";
import { debounce } from "../utils/utils";
import Quill from "quill";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TextEditor = () => {
  const [docData, setDocData] = useState();
  const initialDocTitle = docData?.docName || "Untitled";
  const [docName, setDocName] = useState(initialDocTitle);

  const navigator = useNavigate();

  //setting docName if exists
  useEffect(() => {
    if (initialDocTitle) {
      setDocName(initialDocTitle);
    }
  }, [initialDocTitle]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}${window.location.pathname}`)
      .then((res) => {
        //checking with backend if the document is created or not
        if (res?.data?.msg === "Created") {
          return;
        }
        setDocData(res?.data);
      });
  }, []);

  const onUpdateDoc = async (delta, oldDelta, source) => {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}${window.location.pathname}`,
      { delta, oldDelta, source },
    );
  };

  const debouncedUpdateDoc = debounce(onUpdateDoc, 300);

  const onDeleteDoc = async () => {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}${window.location.pathname}/delete`,
    );
    navigator("/");
  };

  const onRenameDoc = async (newDocName) => {
    try {
      // Send request to rename document
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}${window.location.pathname}/rename`,
        { docName: newDocName },
      );

      // Update docData state with new document name
      setDocData((prevDocData) => ({
        ...prevDocData,
        docName: newDocName,
      }));
    } catch (error) {
      console.error("Error renaming document:", error);
    }
  };

  // setting up quill editor
  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper == null) return;
      wrapper.innerHTML = "";
      const editor = document.createElement("div");
      wrapper.append(editor);
      const quill = new Quill(editor, { theme: "snow" });
      quill.updateContents(new Delta(docData?.data));
      quill.on("text-change", debouncedUpdateDoc);
    },
    [docData, debouncedUpdateDoc],
  );

  return (
    <main className="space-y-4 ">
      <section className="mx-6 mt-2 flex items-center justify-between">
        <div className="">
          <label className="cursor-pointer" htmlFor="docName">
            {" "}
            Name:-
          </label>
          <input
            type="text"
            id="docName"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            onBlur={() => onRenameDoc(docName)}
            className="ml-2 h-10 w-36 rounded-lg border-2 p-2"
          />
        </div>
        <Delete onDeleteDoc={onDeleteDoc} />
      </section>
      <div className="" ref={wrapperRef}></div>
    </main>
  );
};
export default TextEditor;

// eslint-disable-next-line react/prop-types
const Delete = ({ onDeleteDoc }) => {
  return (
    <div className="group relative">
      <button
        onClick={onDeleteDoc}
        className=" text-red-500 transition-opacity duration-300 hover:opacity-70"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
      <div className="invisible absolute -right-4 z-50 rounded-lg border-2 bg-white p-1 shadow-sm transition-[visibility] duration-500 ease-in group-hover:visible">
        Delete
      </div>
    </div>
  );
};
