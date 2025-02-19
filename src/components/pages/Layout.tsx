import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
