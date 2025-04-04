"use client";

import Loader from '@/app/common/Loader';
import { getProfile } from '@/app/redux/feature/ProfileSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import SubscriptionPlans from '../../(portal)/dashboard/subscription/page';
import CreateProfile from '../../(portal)/dashboard/editProfile/page';


export default function page() {
  const route = useRouter()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
  }, [])
  const profile = useSelector((state) => state?.profile)
  console.log(profile)


  return (
    <div>

      {profile?.profileData?.data?.stepper === "Profile" ? (
        <CreateProfile />)
        : profile?.profileData?.data?.stepper === "Subscription" ?  <SubscriptionPlans/>  
          :
          profile?.profileData?.data?.stepper === "Active" ? (route.push("/dashboard")) :
            (<div>
              <Loader />
            </div>
            )
      }
    </div>
  )
}
