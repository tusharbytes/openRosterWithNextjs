"use client";

import React, { useEffect, useState, useMemo } from "react";
import Input from "../../../common/Input";
import { profileImage, profileUpdate } from "@/app/apis/Api";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/app/redux/feature/ProfileSlice";
import Loader from "@/app/common/Loader";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function CreateProfile() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const route = useRouter();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const profileData = useSelector((state) => state.profile.profileData?.data);
  const loader = useSelector((state) => state.profile.profileData);

  // Memoized values
  const email = useMemo(() => profileData?.email, [profileData]);
  const businessData = useMemo(() => profileData?.business || {}, [profileData]);
  const established_year = useMemo(() => businessData?.established_year, [businessData]);

  const [formData, setFormData] = useState({
    legal_company: "",
    name: "",
    established_year: "",
    email: "",
    mobile_number: "",
    licensed_number: "",
    state_licensed: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    zip_code: "",
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        legal_company: businessData.legal_company || "",
        name: businessData.name || "",
        established_year: businessData.established_year || "",
        email: email || "",
        mobile_number: businessData.mobile_number || "",
        licensed_number: businessData.licensed_number || "",
        state_licensed: businessData.state_licensed || "",
        address_1: businessData.address_1 || "",
        address_2: businessData.address_2 || "",
        city: businessData.city || "",
        state: businessData.state || "",
        zip_code: businessData.zip_code || "",
      });
      setPreview(businessData.image || null);
    }
  }, [profileData, email, businessData]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    await profileImage(file);
  };

  const [error, setError] = useState({});

  const validation = () => {
    const newError = {};

    if (!formData.legal_company) newError.legal_company = "Legal company name is required";
    if (!formData.name) newError.name = "Business name is required";
    if (!formData.established_year.match(/^(19|20)\d{2}$/)) newError.established_year = "Enter a valid year";
    if (!formData.mobile_number) {
      newError.mobile_number = "Mobile number is required";
    } else if (!/^\d+$/.test(formData.mobile_number)) {
      newError.mobile_number = "Only digits are allowed in the mobile number";
    } else if (formData.mobile_number.length !== 10) {
      newError.mobile_number = "Mobile number must be exactly 10 digits";
    }

    if (!formData.address_1) newError.address_1 = "Address is required";
    if (!formData.city) newError.city = "City is required";
    if (!formData.state) newError.state = "State is required";

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      const response = await profileUpdate(formData);
      console.log(response?.data, "response");
      if (response?.data) {
        route.push("/intake");
      } else {
        toast.error("Profile not created");
      }
    }
  };

  return (
    <>
      {loader.loading ? (
        <Loader />
      ) : (
        <div className="p-2 px-4 max-w-xl mx-auto bg-white rounded-xl space-y-4">
          <h2 className="text-2xl font-bold text-center">
            {established_year ? "Edit Company Profile" : "Company Profile"}
          </h2>

          <div className="flex flex-col text-center items-center">
            <input onChange={handleFileChange} type="file" name="company_logo" className="hidden" id="company_logo" />

            <label
              htmlFor="company_logo"
              className="text-center text-2xl bg-gray-100 cursor-pointer rounded-[50%] w-[6rem] h-[6rem] flex items-center justify-center border overflow-hidden"
            >
              {preview || businessData?.image ? (
                <img src={preview || businessData.image} className="w-full h-full object-cover" />
              ) : (
                "\\"
              )}
            </label>

            <p className="cursor-pointer text-blue-500">Click to upload your company logo</p>
            <p className="text-xs text-gray-500">.png, .jpg, .jpeg (max 800 x 400px)</p>
          </div>

          {/* Form Fields */}
          <div className="py-2">
            <label>Legal company</label><span className="text-red-500">*</span>
            <Input name="legal_company" value={formData.legal_company} onChange={(e) => setFormData({ ...formData, legal_company: e.target.value })} error={error.legal_company} />

            <label>Business name</label><span className="text-red-500">*</span>
            <Input name="business_name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} error={error.name} />

            <label>Established year</label><span className="text-red-500">*</span>
            <Input name="established_year" type="number" value={formData.established_year} onChange={(e) => setFormData({ ...formData, established_year: e.target.value })} error={error.established_year} />

            <label>Email</label><span className="text-red-500">*</span>
            <Input name="email" type="email" value={formData.email} readOnly />

            <label>Mobile number</label>
            <Input name="mobile_number" type="number" value={formData.mobile_number} onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })} error={error.mobile_number} />

            <label>Licensed number</label>
            <Input value={formData.licensed_number} onChange={(e) => setFormData({ ...formData, licensed_number: e.target.value })} />

            <label>States Licensed </label>
            <Input value={formData.state_licensed} onChange={(e) => setFormData({ ...formData, state_licensed: e.target.value })} />

            <h2 className="py-2">Company Address<span className="text-red-500">*</span></h2>

            <label>Address 1</label>
            <Input name="address1" value={formData.address_1} onChange={(e) => setFormData({ ...formData, address_1: e.target.value })} error={error.address_1} />

            <label>Address 2</label>
            <Input name="address2" value={formData.address_2} onChange={(e) => setFormData({ ...formData, address_2: e.target.value })} />

            <label>City</label>
            <Input name="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} error={error.city} />

            <label>State</label>
            <Input name="state" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} error={error.state} />

            <label>Zip/Postal code</label>
            <Input name="zipCode" type="number" value={formData.zip_code} onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })} error={error.zip_code} />
          </div>

          <div className="flex justify-center w-full">
            <button onClick={handleSubmit} className="text-center bg-blue-400 text-white py-3 px-[5rem] md:px-[10rem] rounded-3xl hover:bg-blue-600">
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateProfile;
