// RoleModal Component - Overlay modal for selecting user role (Customer, Provider, Verifier, Admin)
// Shows 4 role options with descriptions and icons
// On role selection, shows Signin modal overlay with role parameter
// Props: isOpen (boolean), onClose (function)

import { useState, useEffect } from "react";
import { X, Users, Wrench, CheckCircle, Settings } from "lucide-react";
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";

export function RoleModal({ isOpen, onClose }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // Listen for modal switching events
  useEffect(() => {
    const handleOpenSignup = (e) => {
      setShowSigninModal(false);
      setShowSignupModal(true);
      setSelectedRole(e.detail?.role || selectedRole);
    };

    const handleOpenSignin = (e) => {
      setShowSignupModal(false);
      setShowSigninModal(true);
      setSelectedRole(e.detail?.role || selectedRole);
    };

    window.addEventListener("openSignupModal", handleOpenSignup);
    window.addEventListener("openSigninModal", handleOpenSignin);

    return () => {
      window.removeEventListener("openSignupModal", handleOpenSignup);
      window.removeEventListener("openSigninModal", handleOpenSignin);
    };
  }, [selectedRole]);

  // Available user roles with descriptions and icons
  const roles = [
    {
      id: "customer",
      label: "Customer",
      description: "Book and manage home services",
      icon: Users,
      color: "#FF7043",
    },
    {
      id: "provider",
      label: "Service Provider",
      description: "Offer your services and grow your business",
      icon: Wrench,
      color: "#42A5F5",
    },
    {
      id: "verifier",
      label: "Verifier",
      description: "Verify provider credentials",
      icon: CheckCircle,
      color: "#66BB6A",
    },
    {
      id: "admin",
      label: "Admin",
      description: "Manage platform and users",
      icon: Settings,
      color: "#FFA726",
    },
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role.id);
    setShowSigninModal(true);
  };

  const handleCloseSigninModal = () => {
    setShowSigninModal(false);
    setSelectedRole(null);
  };

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
    setSelectedRole(null);
  };

  if (!isOpen) return null;

  // If Signup modal is open, show it with RoleModal behind
  if (showSignupModal && selectedRole) {
    return (
      <>
        {/* Signup modal overlay */}
        <Signup
          isModal={true}
          onClose={handleCloseSignupModal}
          initialRole={selectedRole}
        />
        
        {/* RoleModal stays in background (hidden but still mounted) */}
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto opacity-50 pointer-events-none">
            {/* Dimmed role modal content - not interactive */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Choose Your Role
              </h2>
              <p className="text-gray-600">
                Select the role that best describes you to get started
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // If Signin modal is open, show it with RoleModal behind
  if (showSigninModal && selectedRole) {
    return (
      <>
        {/* Signin modal overlay */}
        <Signin
          isModal={true}
          onClose={handleCloseSigninModal}
          initialRole={selectedRole}
        />
        
        {/* RoleModal stays in background (hidden but still mounted) */}
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto opacity-50 pointer-events-none">
            {/* Dimmed role modal content - not interactive */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Choose Your Role
              </h2>
              <p className="text-gray-600">
                Select the role that best describes you to get started
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Choose Your Role
          </h2>
          <p className="text-gray-600">
            Select the role that best describes you to get started
          </p>
        </div>

        {/* Role Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role)}
                className="p-6 border-2 border-gray-200 rounded-2xl hover:border-gray-400 hover:shadow-lg transition-all text-left group"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${role.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: role.color }} />
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {role.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                  {role.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
