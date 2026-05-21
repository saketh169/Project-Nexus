import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Phone, Lock, Loader } from "lucide-react";
import { useState } from "react";

// Works as both FULL PAGE and MODAL OVERLAY
export default function Signup({ isModal = false, onClose, initialRole = null }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [password, setPassword] = useState("");

  // Use initialRole if passed as prop (from RoleModal), else from location state
  const role = initialRole || location.state?.role || "customer";

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const pwd = formData.get("password");
    const confirmPwd = formData.get("confirmPassword");
    const userRole = formData.get("role");

    // Local validation
    if (!firstName || !lastName || !email || !phone || !pwd || !confirmPwd) {
      setApiError("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setApiError("Please enter a valid email");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setApiError("Please enter a valid 10-digit phone number");
      return;
    }

    if (pwd.length < 6) {
      setApiError("Password must be at least 6 characters");
      return;
    }

    if (pwd !== confirmPwd) {
      setApiError("Passwords do not match");
      return;
    }

    setApiError("");
    setLoading(true);
    
    // Close modal if in modal mode
    if (isModal && onClose) {
      onClose();
    }
    // Dispatch event to close RoleModal in App.jsx
    window.dispatchEvent(new Event("closeRoleModal"));
    // Navigate after a tiny delay to ensure modal closes
    setTimeout(() => {
      if (userRole === "provider" || userRole === "verifier") {
        navigate("/docupload", { state: { role: userRole } });
      } else {
        navigate(`/${userRole}`);
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
        <p className="text-gray-600 text-sm">
          Join Nexus as a <span className="font-semibold text-[#FF7043]">{getRoleDisplayName()}</span> and start using our services
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
        {/* Name fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="John"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

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
              placeholder="you@example.com"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Phone field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="10-digit phone number"
              required
              pattern="^\d{10}$"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Role field - hidden, already selected from RoleModal */}
        <input type="hidden" name="role" value={role} />

        {/* Password fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Min 6 characters"
                required
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
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
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {/* Sign in link */}
      <p className="text-center text-gray-600 text-sm mt-6">
        Already have an account?{" "}
        <button
          onClick={() => {
            if (isModal && onClose) {
              onClose();
              // Signal to open signin modal
              window.dispatchEvent(new CustomEvent("openSigninModal", { detail: { role } }));
            } else {
              navigate("/signin", { state: { role } });
            }
          }}
          className="text-orange-500 font-medium hover:text-orange-600"
        >
          Sign In
        </button>
      </p>
    </>
  );

  // MODAL MODE - overlay on top of RoleModal
  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
        {/* Modal box */}
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
      className="min-h-screen flex items-center justify-center px-4 py-8 relative"
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
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        {formContent}
      </div>
    </div>
  );
}