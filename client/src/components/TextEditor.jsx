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

  const onRenameDoc = async (docName) => {
    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}${window.location.pathname}/rename`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docName,
        }),
      },
    );
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
    <main className="flex flex-col items-center justify-center">
      <div>rename</div>
      <input
        type="text"
        value={docName}
        onChange={(e) => setDocName(e.target.value)}
        onBlur={() => onRenameDoc(docName)}
      />
      <div className="container" ref={wrapperRef}></div>
      <button onClick={onDeleteDoc}>delete</button>
    </main>
  );
};
export default TextEditor;
