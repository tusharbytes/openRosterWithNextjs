"use client"
import Container from "@/app/common/Container";
import { IoOptionsOutline } from "react-icons/io5";
import { getProfile } from "@/app/redux/feature/ProfileSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Input from "@/app/common/Input";


const token = Cookies.get("access_token")
const page = () => {
  const route = useRouter()
  const dipatch = useDispatch()
  useEffect(() => {
    dipatch(getProfile())
  }, [dipatch])

  const profile = useSelector((state) => state?.profile?.profileData?.data?.stepper )
  const loading = useSelector((state) => state?.profile )


  return (
    < >
   
      {profile === "Profile"   ? route.push("/intake") :
          <div className="bg-[#F4F9FF] flex-row justify-center">
            {/* Top Filters */}
            <div className="grid md:grid-cols-2  sm:grid-cols-2     lg:flex  lg:flex-row justify-between items-center   p-4  rounded-xl">
              <div className="flex items-center   pb-2 gap-2">
                <p className=" text-sm font-semibold md:text-lg lg:text-lg">All Jobs</p>
                <button className="bg-blue-500 text-sm text-white p-2 rounded-xl lg:text-2xl">
                  <IoOptionsOutline />
                </button>
              </div>
              <div className="flex-row  space-y-2 justify-center sm:flex  justify-items-center lg:flex-row gap-2 md:gap-4">
                <input
              
                  className="   lg:px-4    md:py-3 w-[250px]   px-3  py-2 lg:py-[1rem]   outline-none border rounded-[1.375rem]   placeholder:text-black     shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  type="text"
                  placeholder="Search Candidate"
                />
                <Link href={profile === "Profile" ? "/intake" : "dashboard/postAJob"} className="">  <button className="lg:px-4  px-1 py-2 lg:py-4 rounded-xl bg-gradient-to-b from-[#111111] to-[#2a527c] text-white shadow-md   transition duration-300">
                  Post New Job

                </button></Link>
              </div>
            </div>

            {/* No Jobs Section */}
            <div className="bg-white flex flex-col items-center justify-center min-h-[60vh] p-6 rounded-lg mt-6">
              <img
                className="w-[200px] md:w-[350px] h-auto"
                src="assets/images/nojob.jpg"
                alt="No jobs"
              />
              <p className="text-center mt-4 text-gray-600 text-lg">No jobs listed</p>
              <button className="bg-[#5983b5] px-4 py-2 text-white rounded-xl shadow-md hover:bg-[#476a92] transition duration-300 mt-4">
                Post Job
              </button>
            </div>
          </div>

      }
    </  >
  );
};

export default page;