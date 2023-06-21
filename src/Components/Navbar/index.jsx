import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

const active = "underline underline-offset-4";

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const capitalizeString = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to="/">Shopi</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? active : "")}
          >
            All
          </NavLink>
        </li>
        {context?.categories?.map((category) => (
          <li>
            <NavLink
              to={`/${category}`}
              className={({ isActive }) => (isActive ? active : "")}
            >
              {capitalizeString(category)}
            </NavLink>
          </li>
        ))}
      </ul>
      <ul className="flex items-center gap-3">
        <li className="text-black/60">ato@shopi.com</li>
        <li>
          <NavLink
            to="/my-orders"
            className={({ isActive }) => (isActive ? active : "")}
          >
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-account"
            className={({ isActive }) => (isActive ? active : "")}
          >
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? active : "")}
          >
            Sign In
          </NavLink>
        </li>
        <li className="flex">
          <ShoppingBagIcon className="w-6 h-6 text-black/80" /> {context.count}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
