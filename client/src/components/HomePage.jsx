import axios from "axios";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigator = useNavigate();

  const handleCreateDoc = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL_PROD}/create`)
      .then((response) => {
        const docId = response.data.docId;
        console.log("Document ID:", docId);
        navigator(`/${docId}`);
      })
      .catch((error) => console.log(error));
  };
  console.log({ hi: import.meta.env.VITE_BACKEND_URL_PROD });
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-12 bg-red-500">
      Homepage
      <button onClick={handleCreateDoc} className="border-2 p-4">
        Create
      </button>
    </div>
  );
};
export default HomePage;
