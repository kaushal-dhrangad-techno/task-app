import { Outlet } from "react-router";
import Sidebar from "../sidebar/Sidebar";

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
