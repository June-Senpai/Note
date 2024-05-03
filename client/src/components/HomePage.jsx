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
    <div className="flex h-screen flex-col items-center justify-center gap-12 bg-white dark:bg-black">
      Homepage
      <button onClick={handleCreateDoc} className="border-2 p-4">
        Create
      </button>
      {docData?.map((doc) => (
        <div key={doc.docId}>
          {doc.docName}
          <span onClick={() => navigator(`${doc.docId}`)}> open</span>
          <span onClick={() => onDeleteDoc(doc.docId)}> delete</span>
        </div>
      ))}
    </div>
  );
};
export default HomePage;
