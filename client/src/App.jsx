import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import TextEditor from "./components/TextEditor";
import "./App.css";
import Navbar from "./components/Navbar";
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:docId" element={<TextEditor />} />
      </Routes>
    </Router>
  );
}
