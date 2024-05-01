import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import TextEditor from "./components/TextEditor";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:docId" element={<TextEditor />} />
      </Routes>
    </Router>
  );
}
