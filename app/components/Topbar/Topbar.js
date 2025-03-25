"use client";
import { FcBusinessman } from "react-icons/fc";
import { GoBell } from "react-icons/go";
import { MdFormatListBulleted } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import Container from "../../common/Container";
import Loader from "../../common/Loader";
import { useEffect, useState } from "react";
import { getProfile } from "@/app/redux/feature/ProfileSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

function Topbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const profile = useSelector((state) => state.profile);
  const profileData = profile?.profileData || {};
  const businessImage = profileData?.data?.business?.image;
  const stepper = profileData?.stepper;
  console.log("inn")

  const handleLogOut = () => {
    Cookies.remove("access_token");
    localStorage.clear();
    router.push("/login");
  };

  return (
    <>
      {profile?.loading ? (
        <div className="flex justify-center  items-center min-h-screen">
          <Loader />
        </div>
      ) : (

        <div className="flex flex-col lg:flex-row p-4 justify-between items-center px-6 bg-white">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <img
              src="/images/dahboard_logo.svg"
              alt="Logo"
              className="h-15 w-auto md:h-16 cursor-pointer"
            />
            {!isOpen ? <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-3xl p-2 lg:hidden"
            >
              <MdFormatListBulleted />
            </button> :
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-3xl p-2 lg:hidden"
              >
                <RxCross2 />
              </button>}
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex flex-wrap justify-center items-center gap-4 text-lg">
            <Link href="/dashboard" className="cursor-pointer hover:text-blue-500 whitespace-nowrap">
              Dashboard
            </Link>

            {stepper === "Profile" ? (
              <>
                <Link href="/intake" className="cursor-pointer hover:text-blue-500 whitespace-nowrap">
                  Create Profile
                </Link>
                <button
                  onClick={handleLogOut}
                  className="cursor-pointer hover:text-red-500 hover:bg-white whitespace-nowrap bg-red-500 text-white px-4 py-2 rounded-xl"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/all-jobs" className="cursor-pointer hover:text-blue-500 whitespace-nowrap">
                  All Jobs
                </Link>
                <Link href="/find-candidates" className="cursor-pointer hover:text-blue-500 whitespace-nowrap">
                  Find Candidates
                </Link>
                <Link href="/account-users" className="cursor-pointer hover:text-blue-500 whitespace-nowrap">
                  Account Users
                </Link>
                <Link href="/messages" className="cursor-pointer hover:text-blue-500 whitespace-nowrap">
                  Messages
                </Link>
                <div className="flex gap-2 items-center">
                  <Link href="/dashboard/settings" className="cursor-pointer hover:text-blue-500">
                    <IoMdSettings size={24} />
                  </Link>
                  <Link href="/notifications" className="cursor-pointer hover:text-blue-500">
                    <GoBell size={24} />
                  </Link>
                  {businessImage ? (
                    <img src={businessImage} className="w-[25px] h-[25px] rounded-full" alt="Profile" />
                  ) : (
                    <FcBusinessman className="cursor-pointer hover:text-blue-500 text-2xl md:text-4xl" />
                  )}
                  <select
                    onChange={(e) => e.target.value === "logOut" && handleLogOut()}
                    className="w-[20px] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="logOut">Log Out</option>
                  </select>
                </div>
              </>
            )}
          </ul>

          {/* Mobile Navigation */}
          {isOpen && (
            <ul className="lg:hidden  flex flex-col w-full items-center bg-white  p-4 gap-4">
              <Link href="/dashboard" className="cursor-pointer hover:text-blue-500 whitespace-nowrap">
                Dashboard
              </Link>
              {stepper === "Profile" ? (
                <Link href="/intake" className="cursor-pointer w-full hover:text-blue-500 whitespace-nowrap">
                  Create Profile
                </Link>
              ) : (
                <>
                  <Link href="/all-jobs" className="cursor-pointer hover:text-blue-500 whitespace-nowrap">
                    All Jobs
                  </Link>
                  <Link href="/find-candidates" className="cursor-pointer hover:text-blue-500 whitespace-nowrap">
                    Find Candidates
                  </Link>
                  <Link href="/account-users" className="cursor-pointer hover:text-blue-500 whitespace-nowrap">
                    Account Users
                  </Link>
                  <Link href="/messages" className="cursor-pointer hover:text-blue-500 whitespace-nowrap">
                    Messages
                  </Link>
                  <Link href="/dashboard/settings" className="cursor-pointer hover:text-blue-500">
                    <IoMdSettings size={24} />
                  </Link>
                  <Link href="/notifications" className="cursor-pointer hover:text-blue-500">
                    <GoBell size={24} />
                  </Link>
                  {businessImage ? (
                    <img src={businessImage} className="w-[25px] h-[25px] rounded-full" alt="Profile" />
                  ) : (
                    <FcBusinessman className="cursor-pointer hover:text-blue-500 text-2xl" />
                  )}
                  <select
                    onChange={(e) => e.target.value === "logOut" && handleLogOut()}
                    className="text-lg rounded-lg p-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="logOut">Log Out</option>
                  </select>
                </>
              )}
            </ul>
          )}
        </div>

      )}
    </>
  );
}

export default Topbar;
