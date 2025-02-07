import Sidebar from "../sidebar/Sidebar";
import AddTask from "../AddTask";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
      {/* <AddTask /> */}
    </>
  );
};

export default Layout;
