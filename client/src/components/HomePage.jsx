import axios from "axios";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigator = useNavigate();

  const handleCreateDoc = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL_PROD}/createDocumentID`)
      .then((response) => {
        const docId = response.data.docId;
        navigator(`/${docId}`);
      })
      .catch((error) => console.log(error));
  };
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
