import { useState } from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import Task from "./components/Task";
import Sidebar from "./components/sidebar/Sidebar";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Layout>
        {/* <Sidebar /> */}
        <Task />
      </Layout>
    </>
  );
}

export default App;
