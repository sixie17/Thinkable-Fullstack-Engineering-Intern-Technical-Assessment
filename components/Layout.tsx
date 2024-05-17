import Footer from "@/components/Footer";
import Header from "@/components/Header";

function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Header
        isLogin={children.type.name === "LoginPage" || "signup" ? false : true}
      />
      {children}
      <Footer />
    </>
  );
}
export default Layout;
