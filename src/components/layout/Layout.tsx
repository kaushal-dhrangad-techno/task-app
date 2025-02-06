import Sidebar from "../sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
