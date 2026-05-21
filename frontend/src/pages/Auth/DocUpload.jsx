import { useNavigate, useLocation } from "react-router-dom";
import { Upload, FileText, Loader } from "lucide-react";
import { useState } from "react";

// Works as both FULL PAGE and MODAL OVERLAY for document uploads (Provider & Verifier)
export default function DocUpload({ isModal = false, onClose, initialRole = null }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({});

  // Use initialRole if passed as prop, else from location state
  const role = initialRole || location.state?.role || "provider";

  // Document requirements based on role
  const documentRequirements = {
    provider: [
      { id: "identity", label: "Government ID", description: "Aadhar, Passport, or Driver License" },
      { id: "business", label: "Business License", description: "Registration certificate or business proof" },
      { id: "experience", label: "Experience Certificate", description: "Proof of work experience" },
      { id: "bank", label: "Bank Details", description: "Bank statement or passbook" },
    ],
    verifier: [
      { id: "identity", label: "Government ID", description: "Aadhar, Passport, or Driver License" },
      { id: "credential", label: "Professional Credentials", description: "Degree/Certificate in relevant field" },
      { id: "background", label: "Background Check", description: "Police clearance or background verification" },
      { id: "experience", label: "Experience Proof", description: "Previous work experience documentation" },
    ],
  };

  const requiredDocs = documentRequirements[role] || documentRequirements.provider;

  const handleFileChange = (docId, e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles({
        ...uploadedFiles,
        [docId]: file,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all documents are uploaded
    const missingDocs = requiredDocs.filter(doc => !uploadedFiles[doc.id]);
    if (missingDocs.length > 0) {
      setApiError(`Please upload all required documents: ${missingDocs.map(d => d.label).join(", ")}`);
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
      navigate(`/${role}`);
    }, 50);
    
    setLoading(false);
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Upload Documents</h1>
        <p className="text-gray-600 text-sm">
          Completing registration as <span className="font-semibold text-[#FF7043]">{getRoleDisplayName()}</span> - Please upload all required documents to complete your profile
        </p>
      </div>

      {/* Error message */}
      {apiError && (
        <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {apiError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Documents grid - full width responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {requiredDocs.map((doc) => (
            <div key={doc.id} className="border border-gray-300 rounded-lg p-4 hover:border-orange-400 transition-colors">
              {/* Document header */}
              <div className="mb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{doc.label}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{doc.description}</p>
                    </div>
                  </div>
                  {uploadedFiles[doc.id] && (
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded whitespace-nowrap ml-2">
                      ✓
                    </span>
                  )}
                </div>
              </div>

              {/* File input */}
              <div className="relative">
                <input
                  type="file"
                  id={doc.id}
                  onChange={(e) => handleFileChange(doc.id, e)}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  required
                />
                <label
                  htmlFor={doc.id}
                  className="flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all"
                >
                  <Upload className="w-4 h-4 text-gray-600 shrink-0" />
                  <span className="text-xs text-gray-600 text-center truncate">
                    {uploadedFiles[doc.id] ? uploadedFiles[doc.id].name : "Upload"}
                  </span>
                </label>
              </div>
            </div>
          ))}
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
          {loading ? "Uploading..." : "Complete Profile"}
        </button>
      </form>
    </>
  );

  // MODAL MODE - overlay
  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
        {/* Modal box - larger for 2-column layout */}
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl max-h-[85vh] overflow-y-auto">
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

  // FULL PAGE MODE
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-8 relative"
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
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full">
        {formContent}
      </div>
    </div>
  );
}
