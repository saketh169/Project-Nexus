
// Routes: / (home), /signin, /signup, /docupload

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SplashScreen } from "./pages/components/SplashScreen";
import Index from "./pages/Index";
import { RoleModal } from "./pages/RoleModal";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import DocUpload from "./pages/Auth/DocUpload";
import { Layout } from "./Layout";

function App() {
  // Manage splash screen visibility - shows only once when server starts
  const [showSplash, setShowSplash] = useState(true);
  
  // Manage role selection modal visibility
  const [showRoleModal, setShowRoleModal] = useState(false);

  // Listen for closeRoleModal event from Signin/Signup/DocUpload
  useEffect(() => {
    const handleCloseRoleModal = () => {
      setShowRoleModal(false);
    };

    window.addEventListener("closeRoleModal", handleCloseRoleModal);
    return () => window.removeEventListener("closeRoleModal", handleCloseRoleModal);
  }, []);

  // Listen for closeRoleModal event from Signin/Signup/DocUpload
  useState(() => {
    const handleCloseRoleModal = () => {
      setShowRoleModal(false);
    };

    window.addEventListener("closeRoleModal", handleCloseRoleModal);
    return () => window.removeEventListener("closeRoleModal", handleCloseRoleModal);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Home route - shows splash, homepage, and role modal */}
        <Route
          path="/"
          element={
            <>
              {showSplash && (
                <SplashScreen onComplete={() => setShowSplash(false)} />
              )}
              {!showSplash && (
                <>
                  <Index onGetStarted={() => setShowRoleModal(true)} />
                  <RoleModal
                    isOpen={showRoleModal}
                    onClose={() => setShowRoleModal(false)}
                  />
                </>
              )}
            </>
          }
        />
        {/* Auth routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/docupload" element={<DocUpload />} />
        {/* All other routes (dashboard) handled by Layout component */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
