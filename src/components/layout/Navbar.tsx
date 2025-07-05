import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <nav className="bg-amber-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="cursor-pointer">
          <Link to="/">
            <p className="font-bold text-2xl font-serif text-white">
              Book <span className="text-cyan-400">Express</span>
            </p>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex justify-center gap-5 text-md text-white">
          <Link to="/books" className="hover:text-cyan-400">
            All Books
          </Link>
          <li className="hover:text-cyan-400">Add Book</li>
          <Link to="/borrow-summary" className="hover:text-cyan-400">
            Borrow Summary
          </Link>
        </ul>

        {/* Mobile Toggle Button */}
        <div className="md:hidden text-white">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Dark Mode Toggle (always visible) */}
        <div className="hidden sm:block ml-4">
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3 text-white text-md">
            <Link
              to="/books"
              className="hover:text-cyan-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Books
            </Link>
            <li className="hover:text-cyan-400">Add Book</li>
            <Link
              to="/borrow-summary"
              className="hover:text-cyan-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Borrow Summary
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
