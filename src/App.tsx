// import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Sidebar from "./components/sidebar/Sidebar";
// import Test from "./components/Test";
// import Test from "./components/Task";
import Command from "./components/Command";
import AddTask from "./components/AddTask";
import Layout from "./components/layout/Layout";
import NoPage from "./components/NoPage";
// import Sidebar from "./components/sidebar/Sidebar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AddTask />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      {/* <Layout> */}
      {/* <Sidebar />
        <AddTask /> */}
      {/* <Command /> */}
      {/* <Task /> */}
      {/* </Layout> */}
    </>
  );
}

export default App;
