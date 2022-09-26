import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        {" "}
        <h1>quickStar</h1>
      </Link>
      <div className="links">
        <Link to="/">App</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
