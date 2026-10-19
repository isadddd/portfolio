import Header from "../organisms/Header";
import Footer from "../organisms/Footer";

export default function DefaultLayout({ children }) {
  return (
    <div className="min-h-screen bg-secondary text-black selection:bg-primary selection:text-white">
      <Header />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
}