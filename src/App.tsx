import { Outlet } from "react-router";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AddBookModal from "./components/module/books/addBooks/AddBookModal";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow w-full my-10">
        <div className="max-w-7xl mx-auto">
          <div>
            <AddBookModal />
          </div>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
