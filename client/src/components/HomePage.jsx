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
    // fetch(`${import.meta.env.VITE_BACKEND_URL}/`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     //docData contains docId and docName
    //     setDocData(data?.docData);
    //   });
  }, []);

  console.log(docData);
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-12 bg-red-500">
      Homepage
      <button onClick={handleCreateDoc} className="border-2 p-4">
        Create
      </button>
      {docData?.map((doc) => (
        <div key={doc.docId} onClick={() => navigator(`${doc.docId}`)}>
          {doc.docName}
        </div>
      ))}
    </div>
  );
};
export default HomePage;
