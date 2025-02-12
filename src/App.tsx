import "./App.css";
import { BrowserRouter, Route, Routes} from "react-router";
import AddTask from "./components/AddTask";
import Layout from "./components/layout/Layout";
import NoPage from "./components/NoPage";
import CompletedTask from "./components/CompletedTask";
import { data } from "./components/ui/app-sidebar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Switch> */}
            <Route index element={<AddTask />} />
            <Route path="/completed" element={<CompletedTask />} />
            {/* </Switch> */}
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
