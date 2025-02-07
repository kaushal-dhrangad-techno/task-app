// import { useState } from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import Sidebar from "./components/sidebar/Sidebar";
import Task from "./components/Task";
// import Test from "./components/Test";
// import Test from "./components/Task";
import AddTask from "./components/AddTask";
// import Sidebar from "./components/sidebar/Sidebar";
function App() {

  return (
    <>
      {/* <Layout> */}
        <Sidebar />
        <AddTask />
        {/* <Task /> */}
      {/* </Layout> */}
    </>
  );
}

export default App;
