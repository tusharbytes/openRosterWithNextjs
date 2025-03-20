"use client"
import Image from 'next/image'
import Container from '../common/Container'
import Link from 'next/link'
function Home() {
  return (

    <div className="w-full h-[99.5vh] flex justify-center " >
      <div className=" h-full bg-cover sm:bg-blue-400 rounded-[32px]  relative md:px-16 px-4" style={{ backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_URL || ""}/images/bannerBg.svg')` }}
      >
        <div className="pt-6">
          <div className="flex justify-between items-center w-full">

            <div className='flex items-center'>

              <Image
                src="/images/dahboard_logo.svg"
                alt="Dashboard Logo"
                width={250}    
                height={108}
                priority
                className="cursor-pointer w-[200px]"
              />
            </div>


            <div className="">
              <Link href="/login" className="bg-black py-4 px-2 md:px-8 lg:px-10 rounded-[8px] text-white">
                Sign in
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-4 lg:mt-8 ">
          <h1 className="uppercase  font-bold sm:leading-[80px] leading-[70px] md:leading-[150px] xl:leading-[170.98px] text-white  text-[50px]   
                      sm:text-[80px] lg:tracking-wide md:text-[150px] xl:text-[170px] py-2">
            POST YOUR JOB
          </h1>
          <div className="max-w-[750px] mt-6 lg:mt-0">
            <p className="text-white font-libre font-medium lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px] leading-[26.66px]">
              Let's hire your next great candidate fast. Our streamlined process connects you with top talent in no time, ensuring you fill positions quickly and efficiently.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-center mt-8">

            <button className="bg-[#5494DC] text-[18px] py-4 px-8 rounded-[8px] text-white">
              Post a shift
            </button>
            <button className="bg-transparent border border-[#5494DC] text-[18px] py-4 px-8 rounded-[8px] text-[#5494DC]">
              <Link href={"/postajob"} > Post a job</Link>
            </button>
          </div>
        </div>
        <div className="hidden  lg:block absolute bottom-10 right-1 md:flex justify-end items-end">
          <Image
            src="/images/girlSitting.svg"
            alt="Girl Sitting Illustration"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
    </div>


  )
}

export default Home