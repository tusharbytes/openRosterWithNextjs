"use client";
import { userSignup } from '@/app/apis/Api';
import Input from '@/app/common/Input';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
function Page() {
  const route = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_Number: "",
    password: "",
    confirm_password: "",
    checked: false
  });

  const [errors, setErrors] = useState({});

  const validation = () => {
    let newError = {};

    if (!formData.name) {
      newError.name = "Name is required";
    }
    if (!formData.email) {
      newError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newError.email = "Invalid email format";
    }
    if (!formData.contact_Number) {
      newError.contact_Number = "Mobile number is required";
    } else if (!/^\d+$/.test(formData.contact_Number)) {
      newError.contact_Number = "Only digits are allowed in the mobile number";
    } else if (formData.contact_Number.length !== 10) {
      newError.contact_Number = "Mobile number must be exactly 10 digits";
    }

    if (!formData.password) {
      newError.password = "Password is required";
    } else if (formData.password.length < 6) {
      newError.password = "Password must be at least 6 characters long";
    }
    if (!formData.confirm_password) {
      newError.confirm_password = "Confirm password is required";
    } else if (formData.password !== formData.confirm_password) {
      newError.confirm_password = "Passwords do not match";
    }
    if (!formData.checked) {
      newError.checked = "You must agree to the terms and conditions";
    }

    return Object.keys(newError).length > 0 ? newError : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validation();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }


    setErrors({});
    const response = await userSignup(formData);
    console.log(response)
    if (response.access_token) {
      Cookies.set("access_token", response.access_token)
      Cookies.set("refresh_token", response.refresh_token)
      Cookies.set("Stepper", response.data.user.stepper);

      if (response.data.stepper === "Profile") {
        route.push("/intake")
      }

    }
  };

  return (
    <div className="flex justify-center">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        <div className="bg-white flex-row justify-center rounded-lg">
          <h2 className="text-[2rem] md:text-2xl font-semibold text-center">Welcome</h2>
          <p className="pb-4 text-center text-gray-500">Please enter your details below to proceed.</p>

          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              type="text"
              name="name"
              placeholder="Name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <Input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              type="email"
              name="email"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            <Input
              value={formData.contact_Number}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only digits
                if (/^\d*$/.test(value) && value.length <= 10) {
                  setFormData({ ...formData, contact_Number: value });
                }
              }}
              type="tel"
              name="contact_Number"
              placeholder="Mobile Number"
            />
            {errors.contact_Number && <p className="text-red-500 text-sm">{errors.contact_Number}</p>}


            <Input
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              type="password"
              name="password"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <Input
              value={formData.confirm_password}
              onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
            />
            {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password}</p>}

            {/* Checkbox */}
            <div className="flex items-center space-x-2">
              <Input
                checked={formData.checked}
                onChange={(e) => setFormData({ ...formData, checked: e.target.checked })}
                type="checkbox"
                name="check"
              />
              <label htmlFor="check" className="text-sm">I agree to the terms and conditions</label>
            </div>
            {errors.checked && <p className="text-red-500 text-sm">{errors.checked}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-400 w-full py-4 rounded-3xl text-white font-medium hover:bg-blue-600 transition">
              Sign up
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-4 text-gray-500">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="px-3">OR</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-3 justify-center">
            <span className="flex items-center font-bold rounded-xl gap-1 px-4 py-2 border cursor-pointer hover:bg-gray-100">
              <FcGoogle /> Google
            </span>
            <span className="px-4 py-2 border flex items-center gap-1 rounded-xl font-bold cursor-pointer hover:bg-gray-100">
              <FaApple /> Apple
            </span>
          </div>

          {/* Login Redirect */}
          <div className="text-center pt-4">
            <p>Already have an Account? <Link href={"/login"} className="text-blue-500">Login</Link></p>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden sm:hidden md:block">
          <img className="rounded-2xl md:h-[601px] sm:object-contain object-cover" src="/images/loginBanner.svg" alt="Teamwork" />
        </div>
      </div>
    </div>
  );
}

export default Page;
``