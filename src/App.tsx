// import { useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
// import Test from "./components/Test";
// import Test from "./components/Task";
import Command from "./components/Command";
import AddTask from "./components/AddTask";
// import Sidebar from "./components/sidebar/Sidebar";
function App() {

  return (
    <>
      {/* <Layout> */}
        <Sidebar />
        <AddTask />
        {/* <Command /> */}
        {/* <Task /> */}
      {/* </Layout> */}
    </>
  );
}

export default App;
