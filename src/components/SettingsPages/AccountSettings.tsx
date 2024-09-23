import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateUser } from "../../actions/userActions"; // Ensure updateUser is imported
import { AppState } from "../../actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const AccountSettings: React.FC = () => {
  const dispatch = useDispatch<any>();
  const userData = useSelector((state: AppState) => state.users.currentUser);

  // Local state for form fields
  const [fullName, setFullName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  // Update local state when userData is fetched
  useEffect(() => {
    if (userData) {
      setFullName(userData.name || "");
      setDateOfBirth(userData.dateOfBirth || ""); // Assuming dateOfBirth exists
    }
  }, [userData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Dispatch the updateUser action
    dispatch(updateUser(fullName, dateOfBirth))
      .then((response: any) => {
        // Handle success (e.g., show a success message)
        console.log("User updated successfully:", response);
      })
      .catch((error: any) => {
        // Handle error (e.g., show an error message)
        console.error("Error updating user:", error);
      });
  };

  console.log("UserData", userData);

  return (
    <div className="text-tBase">
      <div className="grid grid-cols-4 gap-4">
        {/* First Column: Account Form */}
        <div className="p-4 space-y-4 border-r-[0.1rem] border-dashed border-gray-500">
          <h3 className="font-bold text-lg">Personal Data:</h3>
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">
                  {userData?.name ? userData.name.charAt(0).toUpperCase() : "A"}
                </span>
              </div>
              <div>
                <p>{userData?.email}</p>
                <p>ID: 45211677</p>
                <span className="text-red-500">Not verified</span>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="fullName" className="text-sm">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                className="bg-gray-700 text-white p-2 rounded"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="dob" className="text-sm">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                className="bg-gray-700 text-white p-2 rounded"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <label className="text-xs">{userData?.emailStatus}</label>
              </div>
              <input
                disabled
                type="email"
                id="email"
                placeholder={userData?.emailStatus || "Unverified"}
                className="bg-gray-700 text-white p-2 rounded"
                value={userData?.email || ""}
                readOnly
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="country" className="text-sm">
                Country
              </label>
              <select
                disabled
                id="country"
                className="bg-gray-700 text-white p-2 rounded"
                value={userData?.country || ""}
              >
                <option>{userData?.country || "N/A"}</option>
              </select>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 px-4 py-2 rounded text-sm text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Second Column: Documents Verification */}
        {userData?.emailStatus == "verdified" ? (
          <div className="bg-[rgba(200,23,23,0.3)] h-[30vh] border-4 border-solid border-[rgba(200,23,23)] text-white p-6 rounded-lg flex items-center space-x-4 shadow-md">
            {/* Icon Section */}
            <div className="flex-shrink-0">
              <FontAwesomeIcon
                className="h-8 w-8 text-white"
                aria-hidden="true"
                icon={faInfoCircle}
              />
            </div>

            {/* Text Section */}
            <div>
              <h3 className="text-lg font-semibold">
                Identity Verification Required
              </h3>
              <p className="mt-1 text-sm">
                Please complete your identity information to proceed with
                profile verification.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-[rgba(22,22,100,0.1)] border-4 border-solid border-blue-900 rounded-xl flex flex-col p-6 space-y-6">
            {/* Header Section */}
            <div className="flex items-center space-x-4 border-b border-dashed border-gray-500 pb-2">
              {/* Icon */}
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="text-blue-900 text-3xl"
                aria-label="Exclamation Icon"
              />

              {/* Title */}
              <h4 className="text-lg font-semibold m-0">
                Verification of Documents
              </h4>
            </div>

            {/* Body Content */}
            <div className="flex flex-col space-y-4">
              {/* Instruction Text */}
              <p className="text-base m-0">
                Please upload a color photo or scanned image of your regular
                civil passport, driving license, or National Identity card.
              </p>

              {/* Upload Button */}
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Upload Documents
              </button>

              {/* Additional Information */}
              <p className="text-xs text-gray-600 m-0">
                Profile verification means the provision of an official document
                certifying the Client's identity. This procedure can be
                initiated by the Company's security department at any time.
              </p>
            </div>
          </div>
        )}

        {/* Third Column: Security Settings */}
        <div className="p-4 space-y-4 border-l-[0.1rem] border-dashed border-gray-500">
          <h3 className="font-bold text-lg">Security:</h3>
          <div className="flex items-center justify-between">
            <span>Two-step verification</span>
            <span className="text-green-400">Enabled</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>To enter the platform</span>
              <input type="checkbox" checked className="accent-blue-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>To withdraw funds</span>
              <input type="checkbox" checked className="accent-blue-500" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-col space-y-1">
              <label htmlFor="oldPassword" className="text-sm">
                Old password
              </label>
              <input
                type="password"
                id="oldPassword"
                className="bg-gray-700 text-white p-2 rounded"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="newPassword" className="text-sm">
                New password
              </label>
              <input
                type="password"
                id="newPassword"
                className="bg-gray-700 text-white p-2 rounded"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="confirmNewPassword" className="text-sm">
                Confirm new password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                className="bg-gray-700 text-white p-2 rounded"
              />
            </div>
            <button className="bg-blue-600 px-4 py-2 rounded text-sm text-tBase">
              Change Password
            </button>
          </div>
        </div>

        {/* Fourth Column: Preferences */}
        <div className="p-4 space-y-4 border-l-[0.1rem] border-dashed border-gray-500">
          <h3 className="font-bold text-lg">Preferences:</h3>
          <div className="flex flex-col space-y-1">
            <label htmlFor="language" className="text-sm">
              Language
            </label>
            <select
              id="language"
              className="bg-gray-700 text-white p-2 rounded"
            >
              <option>English</option>
              {/* Add more languages as needed */}
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="timezone" className="text-sm">
              Timezone
            </label>
            <select
              id="timezone"
              className="bg-gray-700 text-white p-2 rounded"
            >
              <option>UTC+00:00</option>
              {/* Add more timezones as needed */}
            </select>
          </div>
          <button className="bg-red-600 px-4 py-2 rounded text-sm">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
