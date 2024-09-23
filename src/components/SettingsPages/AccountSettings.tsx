import React, { useState } from "react";

const AccountSettings: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 text-tBase rounded-md">
      <div className="grid grid-cols-4 gap-4">
        {/* First Column: Account Form */}
        <div className="bg-gray-800 p-4 space-y-4 rounded-md">
          <h3 className="font-bold text-lg">Personal Data:</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">A</span>
              </div>
              <div>
                <p>abdullahwcht@gmail.com</p>
                <p>ID: 45211677</p>
                <span className="text-red-500">Not verified</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="firstName" className="text-sm">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Empty"
                className="bg-gray-700 text-white p-2 rounded"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="lastName" className="text-sm">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Empty"
                className="bg-gray-700 text-white p-2 rounded"
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
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Unverified"
                className="bg-gray-700 text-white p-2 rounded"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="country" className="text-sm">
                Country
              </label>
              <select
                id="country"
                className="bg-gray-700 text-white p-2 rounded"
              >
                <option>Pakistan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Second Column: Documents Verification */}
        <div className="bg-[#881111] p-4 h-[50%]">
          <p>
            You need to fill identity information before verification of your
            profile.
          </p>
        </div>

        {/* Third Column: Security Settings */}
        <div className="bg-gray-800 p-4 space-y-4 rounded-md">
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
            <button className="bg-blue-600 px-4 py-2 rounded text-sm">
              Change Password
            </button>
          </div>
        </div>

        {/* Fourth Column: Preferences */}
        <div className="bg-gray-800 p-4 space-y-4 rounded-md">
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
