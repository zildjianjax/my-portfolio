import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../lib/context";
import AuthCheck from "./AuthCheck";
import Google from "./Authentication/Google";
import SignOut from "./Authentication/SignOut";
import Tools from "./Tools";

const Navbar = () => {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="border-b p-4 nav3s">
      <ul className="flex justify-between items-center">
        <li>
          <AuthCheck
            fallback={
              (<h2 className="text-white">My Portfolio</h2>) as JSX.Element
            }
          >
            <Link href="/" passHref>
              <button className="logo">
                <img
                  src="img/Logo%20game.png"
                  alt="Plant vs Undead - Your NFT Garden"
                />
              </button>
            </Link>
          </AuthCheck>
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
