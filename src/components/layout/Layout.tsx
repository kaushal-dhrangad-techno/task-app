import Sidebar from "../sidebar/Sidebar";
import Task from "../AddTask";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
      <Task />
    </>
  );
};

export default Layout;
