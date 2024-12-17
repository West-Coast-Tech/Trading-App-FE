import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../actions/authActions";
import { AppState } from "../../actions/types";
import { resetState, setError } from "../../features/auth/authSlice";
import { hashPassword } from "../../services/auth";

const ResetPassword = (_props: any) => {
  const navigate = useNavigate();

  const { resetToken, error, id, loading } = useSelector(
    (state: AppState) => state.auth
  );
  const dispatch = useDispatch<any>();

  // State to track success
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    if (!resetToken) {
      navigate("/login");
    }
  }, [resetToken, navigate]);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      dispatch(setError("The passwords do not match"));
      return;
    }

    if (resetToken === null || id === null) {
      return;
    }
    const hashedPassword = await hashPassword(newPassword);
    const payload = {
      id,
      newPassword: hashedPassword,
      resetToken,
    };

    try {
      await dispatch(resetPassword(payload)); // Dispatch the resetPassword action
      setResetSuccess(true); // Set success state to true
      setTimeout(() => {
        dispatch(resetState());
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Password reset failed:", error);
      // Handle any additional error handling if needed
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex justify-center font-roboto">
      <div className="flex flex-col">
        <div className="flex justify-center pb-7 pt-10">
          <img className="h-48" src="src/assets/buildings.svg" alt="Logo" />
        </div>
        <h1 className="text-2xl mb-8 text-white text-center">
          Sign in to Trading App
        </h1>

        <p className="text-red-600 text-xs text-center italic">{error}</p>

        {resetSuccess ? (
          <div className="bg-blue-500 p-4 rounded-lg border border-green-700 text-white text-center mb-4">
            <p>Password has been successfully reset!</p>
            <button
              className="font-extrabold mt-2 px-4 py-2 bg-blue-700 rounded hover:bg-blue-300"
              onClick={() => dispatch(resetState())}
            >
              Go to Login
            </button>
          </div>
        ) : (
          <div className="bg-[#161b22] p-8 rounded-lg border-[#30363d] shadow-md w-full sm:w-96">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-[#f0f6fc] mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-[93%] bg-[#0d1117] p-3 border border-[#30363d] rounded"
                  style={{
                    color: "#ffffff",
                    caretColor: "#ffffff",
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="flex justify-between text-[#f0f6fc] mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-[93%] p-3 bg-[#0d1117] border border-[#30363d] rounded"
                  style={{
                    color: "#ffffff",
                    caretColor: "#ffffff",
                  }}
                />
              </div>
              <button
                type="submit"
                className={`w-full p-3 ${
                  loading ? "bg-[#1c7c36]" : "bg-[#238636]"
                } text-white font-semibold rounded ${
                  loading ? "cursor-not-allowed" : "hover:bg-[#249990]"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.961 7.961 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging In...
                  </div>
                ) : (
                  "Change Password"
                )}
              </button>
            </form>
          </div>
        )}

        <div className="mt-4 p-4 rounded-lg border-2 border-[#30363d] text-center bg-[#0d1117]"></div>
      </div>
    </div>
  );
};

export default ResetPassword;
