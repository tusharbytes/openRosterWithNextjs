import Input from '@/app/common/Input';
import React from 'react'

function CreateJobView({formData}) {
    console.log(formData,"inn")
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
    <div className="text-center mb-6">
      <p className="text-gray-600">
        Nice work! Now all you need to do is review for accuracy, add your logo. 
        If you want to make any changes, just click the edit icons on the right of each entry.
      </p>
      <div className="mt-4">
        <label className="cursor-pointer flex justify-center border p-4">
          <input type="file" accept="image/*" className="hidden" />
          <div className="w-32 h-32 border-2 border-dashed rounded-full flex items-center justify-center">
            Click to upload your company logo
          </div>
        </label>
      </div>
    </div>

    <div className="border-b py-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-blue-600 font-semibold">Job title & Location</h2>
          <p>Home health aide (HHA)</p>
          <p>Sics</p>
          <p>1234 Elm Street, Springfield, IL 62704, USA</p>
        </div>
        <button className="text-gray-500">✎</button>
      </div>
    </div>

    <div className="border-b py-4 opacity-5">
      <div className="flex justify-between">
        <div>
          <h2 className="text-blue-600 font-semibold">Job timings</h2>
          <p>9:30 AM - 6:30 PM | Monday to Saturday</p>
        </div>
        <button className="text-gray-500">✎</button>
      </div>
    </div>

    <div className="border-b py-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-blue-600 font-semibold">Overview</h2>
          <p>
            We are seeking reliable and hardworking warehouse workers to join our team. 
            The warehouse worker will be responsible for various tasks such as receiving, 
            processing, storing, and shipping goods.
          </p>
        </div>
        <button className="text-gray-500">✎</button>
      </div>
    </div>

    <div className="border-b py-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-blue-600 font-semibold">Responsibilities</h2>
          <ul className="list-disc pl-5">
            <li>Receive, unload, and organize incoming shipments.</li>
            <li>Pick, pack, and prepare orders for shipping.</li>
            <li>Operate warehouse equipment such as forklifts, pallet jacks, and hand trucks.</li>
          </ul>
        </div>
        <button className="text-gray-500">✎</button>
      </div>
    </div>

    <div className="border-b py-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-blue-600 font-semibold">Qualifications</h2>
          <p>Describe the required work experience, education, or other characteristics.</p>
        </div>
        <button className="text-gray-500">✎</button>
      </div>
    </div>

    <div className="border-b py-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-blue-600 font-semibold">Job details</h2>
          <p>Job type: Full time</p>
          <p>Skills: Add skills to help identify qualified candidates</p>
        </div>
        <button className="text-gray-500">✎</button>
      </div>
    </div>

    <div className="py-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-blue-600 font-semibold">Where will candidates apply?</h2>
          <p>On open roster</p>
        </div>
        <button className="text-gray-500">✎</button>
      </div>
    </div>
  </div>
);
};

 

export default CreateJobView