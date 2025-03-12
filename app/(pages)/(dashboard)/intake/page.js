"use client";

import Loader from '@/app/common/Loader';
import { getProfile } from '@/app/redux/feature/ProfileSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CreateProfile from '../dashboard/editProfile/page';
import { useRouter } from 'next/navigation';


export default function page() {
  const route = useRouter()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
  }, [])
  const profile = useSelector((state) => state?.profile)
  console.log(profile?.stepper)


  return (
    <div>

      {profile?.profileData?.data?.stepper === "Profile" ? (
        <CreateProfile />)
        : profile?.profileData?.data?.stepper === "Subscription" ? (route.push("/subscription"))
          :
          profile?.profileData?.data?.stepper === "Active" ? (route.push("/dashboard")) :
            (<div>
<Loader/>
            </div>
            )
      }
    </div>
  )
}
