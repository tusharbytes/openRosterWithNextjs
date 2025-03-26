"use client";
import "react-toastify/dist/ReactToastify.css";
import instance from "@/app/common/service/Instance";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Input from "@/app/common/Input";
import Link from "next/link";
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from "react-icons/fa6";
import Loader from "@/app/common/Loader";
import { toast, ToastContainer } from "react-toastify";


import Image from "next/image";
function Login() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false)
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
    checked: true,
  });

  const validateForm = () => {
    let formErrors = {};
    if (!userLog.email) {
      formErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userLog.email)) {
      formErrors.email = "Invalid email address";
    }
    if (!userLog.password) {
      formErrors.password = "Password is required";
    } else if (userLog.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }
    if (!userLog.checked) {
      formErrors.checked = "You must agree to the terms";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {

      setLoader(true)
      try {
        const response = await instance.post(`login`, userLog);
        console.log(response)
        if (response.data.access_token) {
          toast.success(response.data.message)
          Cookies.set("access_token", response.data.access_token);
          Cookies.set("refresh_token", response.data.refresh_token);
          Cookies.set("Stepper", response.data.user.stepper);

          setUserLog({
            email: "",
            password: "",
            checked: false,
          });

          const stepper = response?.data?.user?.stepper;
          setLoader(false)

          if (stepper === "Active") {

            router.push("/dashboard");
          } else if (stepper === "Subscription") {
            router.push("/dashboard/subscription");
          } else {
            router.push("/intake");
          }
        }
      } catch (error) {

        setLoader(false)
        toast.error(error.message || "Login failed");
        console.log(error.message, "inn")
      }
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-4 gap-5">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />


          {/* Form Container */}
          <div className="bg-white rounded-lg   w-full md:w-[500px] p-6">
            <h2 className="text-3xl md:text-2xl font-semibold text-center">
              Welcome
            </h2>
            <p className="pb-4 text-center text-gray-500">
              Please enter your details below to proceed.
            </p>

            <div className="space-y-4">
              <Input
                type="email"
                name="email"
                value={userLog.email}
                onChange={(e) =>
                  setUserLog({ ...userLog, email: e.target.value })
                }
                placeholder="Email"
                error={errors.email}
                autoComplete={true}
              />
              <Input
                type="password"
                value={userLog.password}
                onChange={(e) =>
                  setUserLog({ ...userLog, password: e.target.value })
                }
                placeholder="Enter password"
                error={errors.password}
              />

              {/* Remember me & Forgot password */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={userLog.checked}
                    onChange={(e) =>
                      setUserLog({ ...userLog, checked: e.target.checked })
                    }
                  />
                  <label htmlFor="terms">Remember me</label>
                </div>
                <Link href="/forgot-password" className="text-blue-500">
                  Forgot password?
                </Link>
              </div>

              <button
                onClick={handleSubmit}
                className="bg-blue-500 w-full py-3 rounded-3xl text-white font-medium hover:bg-blue-600 transition"
              >
                Sign In
              </button>

              {/* OR separator */}
              <div className="flex items-center my-4 text-gray-500">
                <div className="flex-1 h-px bg-gray-400"></div>
                <span className="px-3">OR</span>
                <div className="flex-1 h-px bg-gray-400"></div>
              </div>

              {/* Social login buttons */}
              <div className="flex gap-3 justify-center">
                <span className="flex items-center font-bold rounded-xl gap-1 px-4 py-2 border cursor-pointer hover:bg-gray-100">
                  <FcGoogle /> Google
                </span>
                <span className="px-4 py-2 border flex items-center gap-1 rounded-xl font-bold cursor-pointer hover:bg-gray-100">
                  <FaApple /> Apple
                </span>
              </div>

              {/* Signup link */}
              <div className="text-center pt-4">
                <p>
                  No account?{" "}
                  <Link className="text-blue-500" href="/register">
                    Signup
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Image container */}
          <div className="hidden md:block">
            <Image
              className="rounded-2xl md:h-[601px] sm:object-contain object-cover"
              src="assets/images/loginBanner.svg"
              alt="Teamwork"
              width={500}
              height={601}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
