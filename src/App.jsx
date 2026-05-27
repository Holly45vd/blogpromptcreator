import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import PromptResultPage from "./pages/PromptResultPage";

function App() {
  return (
    // 변수 대신 실제 GitHub Pages 경로인 '/blogpromptcreator'를 직접 입력
    <BrowserRouter basename="/blogpromptcreator">
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/result" element={<PromptResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;