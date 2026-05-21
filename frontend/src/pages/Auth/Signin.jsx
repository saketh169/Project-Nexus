import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Loader } from "lucide-react";
import { useState } from "react";

// Works as both FULL PAGE and MODAL OVERLAY
export default function Signin({ isModal = false, onClose, initialRole = null }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Use initialRole if passed as prop (from RoleModal), else from location state
  const role = initialRole || location.state?.role || "customer";

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    setApiError("");
    setLoading(true);

    // Local validation
    if (!email || !password) {
      setApiError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setApiError("Please enter a valid email");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setApiError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    // Close modal if in modal mode
    if (isModal && onClose) {
      onClose();
    }
    
    // Dispatch event to close RoleModal in App.jsx
    window.dispatchEvent(new Event("closeRoleModal"));
    
    // Navigate after a tiny delay to ensure modal closes
    setTimeout(() => {
      if (role === "provider" || role === "verifier") {
        navigate("/docupload", { state: { role } });
      } else {
        navigate(`/${role}`);
      }
    }, 50);
  };

  const handleClose = () => {
    if (isModal && onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  // Get role display name
  const getRoleDisplayName = () => {
    const roleMap = {
      customer: "Customer",
      provider: "Service Provider",
      verifier: "Verifier",
      admin: "Admin"
    };
    return roleMap[role] || "User";
  };

  const formContent = (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-gray-600 text-sm">
          Signing in as <span className="font-semibold text-[#FF7043]">{getRoleDisplayName()}</span>
        </p>
      </div>

      {/* Error message */}
      {apiError && (
        <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {apiError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Email field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Password field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength={6}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          style={{
            background: loading
              ? "linear-gradient(135deg, #ccc, #aaa)"
              : "linear-gradient(135deg, #FF7043, #66BB6A)",
          }}
        >
          {loading && <Loader className="w-4 h-4 animate-spin" />}
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Sign up link */}
      <p className="text-center text-gray-600 text-sm mt-6">
        Don't have an account?{" "}
        <button
          onClick={() => {
            if (isModal && onClose) {
              onClose();
              // Signal to open signup modal
              window.dispatchEvent(new CustomEvent("openSignupModal", { detail: { role } }));
            } else {
              navigate("/signup", { state: { role } });
            }
          }}
          className="text-orange-500 font-medium hover:text-orange-600"
        >
          Sign Up
        </button>
      </p>
    </>
  );

  // MODAL MODE - overlay on top of RoleModal
  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
        {/* Modal box */}
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute w-10 h-10 text-gray-400 hover:text-gray-600 text-3xl font-light transition-colors flex items-center justify-center"
            style={{ top: '5px', right: '5px' }}
            title="Close"
          >
            ×
          </button>
          {formContent}
        </div>
      </div>
    );
  }

  // FULL PAGE MODE - complete page
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        background: "linear-gradient(135deg, #FFF5E6 0%, #E8F5E9 50%, #FFF8E1 100%)",
      }}
    >
      {/* Back button */}
      <button
        onClick={handleClose}
        className="absolute top-6 left-6 px-4 py-2 text-gray-600 hover:bg-white/50 rounded-full transition-all flex items-center gap-2"
      >
        <span>✕</span> Back
      </button>

      {/* Form container */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {formContent}
      </div>
    </div>
  );
}