import { useAuthStore } from "@/store/useAuthStore";
import { LogOutIcon, MessageSquareIcon, Settings, UserIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="px-10 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquareIcon className="w-8 h-5 text-primary flex items-center justify-center" />
              </div>
              <h1 className="text-lg font-bold">Chat-Hive</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`btn btn-sm gap-3 transition-colors`}
            >
              <Settings className="w-5 h-5 flex items-center justify-center" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className={`btn btn-sm gap-3 transition-colors `}
                >
                  <UserIcon className="w-5 h-5 flex items-center justify-center" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOutIcon className="w-5 h-5 flex items-center justify-center" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
