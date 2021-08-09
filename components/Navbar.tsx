import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import AuthCheck from "./AuthCheck";
import Google from "./Authentication/Google";
import SignOut from "./Authentication/SignOut";
import Tools from "./Tools";

const Navbar = () => {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="border-b p-4">
      <ul className="flex justify-between items-center">
        <li>
          <Link href="/">
            <button className="text-2xl text-green-600">PvU Tracker</button>
          </Link>
        </li>

        <AuthCheck>
          <li>
            <Tools />
          </li>
        </AuthCheck>

        {/* user is signed-in and has username */}
        {user && (
          <>
            <li>
              <SignOut />
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!user && (
          <li>
            <Google />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
