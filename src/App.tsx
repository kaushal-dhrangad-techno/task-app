import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import AddTask from "./components/AddTask";
import Layout from "./components/layout/Layout";
import NoPage from "./components/NoPage";
import Test from "./components/TestComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AddTask />} />
            <Route path="/completed" element={null} />
            <Route path="/test" element={<Test />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
