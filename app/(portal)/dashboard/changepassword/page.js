"use client"
import Button from "@/app/common/Button";
import Input from "@/app/common/Input";
import Topbar from "@/app/components/Topbar/Topbar";
import { useState } from "react";

export default function ChangePassword() {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

   

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        // Call API to update password (mock function here)
        console.log("Password updated successfully", formData);
    };

    return (
        <>  
        <div className="flex items-center justify-center min-h-screen bg-[#F4F9FF]">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl  ">
                <h2 className="text-2xl font-semibold text-gray-800 text-center  ">Change Password</h2>
                {error && <p className="text-red-500 text-sm  text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={formData.currentPassword}
                        onChange={(e)=>setFormData({...formData,currentPassword : e.target.value})}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={formData.newPassword}
                        onChange={(e)=>setFormData({...formData,newPassword : e.target.value})}

                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={formData.confirmPassword}
                        onChange={(e)=>setFormData({...formData,confirmPassword : e.target.value})}

                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        disabled={!formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Update Password
                    </button>

                </form>
            </div>
        </div>
        </>

    );
}