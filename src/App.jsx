import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import PromptResultPage from "./pages/PromptResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/result" element={<PromptResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;