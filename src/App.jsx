import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import PromptResultPage from "./pages/PromptResultPage";

function App() {
  return (
    // basename 속성을 주입하여 GitHub Pages의 하위 경로(/blogpromptcreator/)를 인식하게 만듦
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/result" element={<PromptResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;