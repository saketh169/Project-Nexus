import { Routes, Route, Navigate } from "react-router-dom";
import CustomerHome from "./pages/HomePages/CustomerHome";
import AdminHome from "./pages/HomePages/AdminHome";
import VerifierHome from "./pages/HomePages/VerifierHome";
import ProviderHome from "./pages/HomePages/ProviderHome";

export function Layout() {
  return (
    <Routes>
      <Route path="customer" element={<CustomerHome />} />
      <Route path="admin" element={<AdminHome />} />
      <Route path="verifier" element={<VerifierHome />} />
      <Route path="provider" element={<ProviderHome />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
