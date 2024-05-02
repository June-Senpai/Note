import axios from "axios";
import "quill/dist/quill.snow.css";
import Delta from "quill-delta";
import { debounce } from "../utils/utils";
import Quill from "quill";
import { useCallback, useEffect, useState } from "react";

const TextEditor = () => {
  const [docData, setDocData] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}${window.location.pathname}`)
      .then((res) => {
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

  return <div className="container" ref={wrapperRef}></div>;
};
export default TextEditor;
