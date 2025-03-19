"use client"
import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/app/common/Loader";
import { profileUpdate } from "@/app/apis/Api";
import { getProfile } from "@/app/redux/feature/ProfileSlice";
import Container from "@/app/common/Container";
import Topbar from "@/app/components/Topbar/Topbar";

const plans = [
    {
        id: 1,
        title: "Open Roster + Free",
        subtitle: "Free Plan (Freemium Model)",
        price: "$0/",
        day: "Month",
        features: [
            "Post a limited number of job listings",
            "Access to a basic pool of RosterPros",
            "Basic applicant tracking",
            "You can send message to 10 candidates and post 3 jobs"
        ],
        buttonText: "Continue"
    },
    {
        id: 2,
        title: "Open Roster + FlexiPlan",
        subtitle: "FlexiPlan (Essential Features)",
        price: "$17/",
        day: "Day",
        features: [
            "Promoted job postings",
            "Set your daily budget. Start and stop campaigns anytime.",
            "Unlimited applicants",
            "You can send message to 30 candidates",
            "Published to OpenRoster application and extensive partner network",
            "Automatically sent to relevant candidates",
            "Ad-free experience"
        ],
        buttonText: "Continue"
    },
    {
        id: 3,
        title: "Open Roster + Premium",
        subtitle: "Premium Plan (Advanced Tools)",
        price: "$250/",
        day: "Month",
        features: [
            "Everything in the Standard Plan",
            "Featured job listings for higher visibility",
            "AI-powered candidate matching",
            "Advanced analytics and reporting",
            "Dedicated account manager for personalized support"
        ],
        buttonText: "Continue"
    },
    {
        id: 4,
        title: "Open Roster + ELITE Staffing",
        subtitle: "OpenRoster ELITE staffing stack",
        price: "",
        features: [
            "On-demand staffing platform",
            "Access and management payments to Rosterpros in one suite",
            "Access to credentialed RosterPros with all licenses and background checks",
            "All Premium features",
            "API integration with your HR or ATS systems",
            "Bulk shift and contracts management with RosterPros",
            "Easy to Use Dashboard",
            "Priority support with dedicated account managers",
            "AI Powered shifts matching",
            "Overtime management tool",
            "Hire RosterPros to Permanent placements after 6 months at a low commission"
        ],
        buttonText: "Request"
    }
];

const SubscriptionPlans = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    
    useEffect(() => {
        setLoader(true);
        dispatch(getProfile());
    }, [dispatch]);

    const profile = useSelector((state) => state);
    const activePlan = profile?.profile?.profileData?.data?.plan;

    console.log("Active Plan:", activePlan);

    const handleAddPlan = async (planTitle) => {
        setLoader(true);
        await profileUpdate({ plan: planTitle });
        dispatch(getProfile()) ;
    };

    return (
        <>    
        <Topbar/>     
          <Container>
            {profile?.profile.loading ? (
                <Loader />
            ) : (
                <div className="bg-blue-50 py-2">
                    <div className="px-4">
                        <h2 className="text-3xl font-bold text-center  ">Choose your right plan!</h2>
                        <p className="text-gray-600 text-center pb-2">
                            Select from best plans, ensuring a perfect match. Need more or less? Customize your subscription for a seamless fit!
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {plans.map((plan) => {
                                const isActive = activePlan === plan.title;

                                return (
                                    <div
                                        key={plan.id}
                                        className={`border bg-white flex flex-col rounded-xl p-6 shadow-lg relative ${
                                            isActive ? "border-red-500" : "border-gray-200"
                                        }`}
                                    >
                                        
                                        <h3 className="text-lg font-semibold text-center text-gray-900">{plan.title}</h3>
                                        <p className="text-sm text-center text-gray-500">{plan.subtitle}</p>
                                        {plan.price && (
                                            <p className="text-3xl font-bold items-center flex justify-center">
                                                {plan.price} <span className="text-blue-500 text-xl">{plan.day}</span>
                                            </p>
                                        )}
                                        <p className="font-semibold py-4">Features:</p>
                                        <ul className="text-sm text-gray-700">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    <IoMdCheckmarkCircleOutline className="text-green-500 text-lg" />
                                                    <p>{feature}</p>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-auto">
                                            <button
                                                disabled={isActive}
                                                onClick={() => handleAddPlan(plan.title)}
                                                className={`mt-6 w-full py-3 rounded-full font-semibold text-white ${
                                                    isActive
                                                        ? "bg-green-500 hover:bg-green-500 cursor-not-allowed"
                                                        : "bg-blue-500 hover:bg-blue-700"
                                                }`}
                                            >
                                                {isActive ? "Active" : plan.buttonText}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </Container></>

    );
};

export default SubscriptionPlans;
