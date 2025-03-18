"use client"

import Container from "@/app/common/Container";
import Topbar from "@/app/components/(topbar)/page";
import Link from "next/link";
import React from "react";

const settingsOptions = [
  { name: "Edit profile", path: "/dashboard/editProfile" },
  { name: "My Subscription", path: "/dashboard/subscription" },
  { name: " Change password", path: "/dashboard/changepassword" },
  { name: "Terms and conditions", path: "/dashboard/subscription" },
  { name: "Privacy policy", path: "/dashboard/policy" },
  { name: "Help and Support", path: "/dashboard/help" },
];

const Settings = () => {
  return (
     <Container>
      <Topbar/>
      <div className="bg-[#F4F9Fb] h-screen  px-4 flex flex-col">
        <h2 className="text-2xl font-semibold text-center py-4 text-gray-800">
          Account Settings
        </h2>

        <div className="space-y-4">
          {settingsOptions.map((option, index) => (
          <a 
          key={index}
           href={option.path}
              className="flex justify-between items-center border bg-white p-5 rounded-lg"
            >
              <p className="text-gray-700 font-medium">{option.name}</p>
              <p className="text-gray-400 text-lg">›</p>
            </a>
          ))}
        </div>
      </div>
      </Container>
    
  );
};

export default Settings;
