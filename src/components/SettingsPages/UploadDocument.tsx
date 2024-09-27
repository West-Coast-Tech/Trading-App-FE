import React, { useEffect, useRef, useState } from "react";
import { getUserData, uploadDocuments } from "../../actions/userActions";
import {
  faExclamationCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { documentUploadSuccess } from "../../features/users/usersSlice";
import { AppState } from "../../actions/types";

const UploadDocument = () => {
  // State for selected files
  const dispatch = useDispatch<any>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const userData = useSelector((state: AppState) => state.users.currentUser);

  useEffect(() => {
    if (userData?.documents?.length && userData?.documents?.length >= 5) {
      setShowThankYou(true);
    }
  }, [dispatch, userData]);
  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Handler for file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Handle file change called");
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      console.log("Files selected:", filesArray);
      setSelectedFiles(filesArray);
    }
  };

  // Handler to trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handler to remove a selected file
  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  // Handler to submit the upload
  const handleUploadSubmit = () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one document to upload.");
      return;
    }

    try {
      dispatch(uploadDocuments(selectedFiles))
        .then((response: any) => {
          console.log("Documents uploaded successfully:", response);
          setSelectedFiles([]);
        })
        .catch((error: any) => {
          console.error("Error uploading documents:", error);
        });
    } catch (error) {
      console.log("Uploading documents Failed");
    }
  };
  console.log("isDocument USer", userData?.documents?.length);
  return (
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
        <h4 className="text-lg font-semibold m-0">Verification of Documents</h4>
      </div>

      {/* Body Content */}
      <div className="flex flex-col space-y-4">
        {/* Instruction Text */}
        <p className={`text-base m-0  ${showThankYou ? "hidden" : ""}`}>
          Please upload a color photo or scanned image of your regular civil
          passport, driving license, or National Identity card.
        </p>
        <p>
          <div className={`text-base m-0  ${showThankYou ? "" : "hidden"}`}>
            <p className="">
              The documents are submitted successfully and are now waiting
              approval
            </p>
          </div>
        </p>
        {/* Upload Button */}
        <button
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
            showThankYou ? "hidden" : ""
          }`}
          onClick={handleUploadClick}
        >
          Select Documents
        </button>

        {/* Hidden File Input */}
        <input
          type="file"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept=".jpeg,.jpg,.png,.pdf" // Restrict file types
        />

        {/* Display Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="bg-gray-800 p-4 rounded">
            <h5 className="text-sm font-semibold mb-2">Selected Documents:</h5>
            <ul className="space-y-1 pl-0 ml-0">
              {selectedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-sm">{file.name}</span>
                  <div
                    className="text-red-500 hover:text-red cursor-pointer"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                className={`${"bg-green-600 hover:bg-green-700"} text-white px-4 py-2 rounded`}
                onClick={handleUploadSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Additional Information */}
        <p className="text-xs text-gray-600 m-0">
          Profile verification means the provision of an official document
          certifying the Client's identity. This procedure can be initiated by
          the Company's security department at any time.
        </p>
      </div>
    </div>
  );
};

export default UploadDocument;
