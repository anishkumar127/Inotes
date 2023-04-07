import NavbarSection from "./NavbarSection";

const Layout = ({ children }: any) => {
  return (
    <div>
      <NavbarSection />
      {children}
    </div>
  );
};

export default Layout;
