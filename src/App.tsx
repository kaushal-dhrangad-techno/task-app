import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import AddTask from "./components/pages/AddTask";
import Layout from "./components/pages/Layout";
import NoPage from "./components/pages/NoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AddTask />} />
            <Route path="/completed" element={null} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
