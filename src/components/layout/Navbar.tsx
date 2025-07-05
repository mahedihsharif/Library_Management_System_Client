import { Link } from "react-router";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  return (
    <nav className="bg-amber-900">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3">
        {/* logo */}
        <div className="cursor-pointer">
          <Link to="/">
            <p className="font-bold text-2xl font-serif">
              Book <span className="text-cyan-400">Express</span>
            </p>
          </Link>
        </div>
        {/* menu item */}
        <ul className="flex justify-center gap-5 text-md text-white">
          <Link to="/books">All Books</Link>
          <li>Add Book</li>
          <Link to="/borrow-summary">Borrow Summery</Link>
        </ul>
        {/* dark-mode button */}
        <div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
