// HomePage Component - Main landing page with hero, services, and stats sections
// Features: GSAP animations, responsive design, gradient styling
// Prop: onGetStarted - callback when user clicks "Get Started" or "Book a Service"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Snowflake,
  Bike,
  ChefHat,
  Home,
  ArrowRight,
  Star,
  Users,
  Clock,
  Wrench,
  CheckCircle,
  Settings,
  ChevronDown,
} from "lucide-react";

// Service offerings with icons and colors
const SERVICES = [
  {
    name: "AC Repair",
    description: "Expert air conditioning maintenance and repair",
    Icon: Snowflake,
    color: "#FF7043",
    bgColor: "#FFF3E0",
  },
  {
    name: "Bike Service",
    description: "Professional bicycle servicing and tune-ups",
    Icon: Bike,
    color: "#42A5F5",
    bgColor: "#E3F2FD",
  },
  {
    name: "Kitchen Cleaning",
    description: "Deep cleaning for spotless kitchens",
    Icon: ChefHat,
    color: "#66BB6A",
    bgColor: "#E8F5E9",
  },
  {
    name: "Room Cleaning",
    description: "Comprehensive room cleaning services",
    Icon: Home,
    color: "#FFA726",
    bgColor: "#FFF8E1",
  },
];

// Platform statistics displayed to users
const STATS = [
  { label: "Happy Customers", value: "10K+", Icon: Users },
  { label: "Services Done", value: "50K+", Icon: Star },
  { label: "Avg Response", value: "30min", Icon: Clock },
];

// User roles with descriptions (reused from RoleModal)
const ROLES = [
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

// FAQs
const FAQS = [
  {
    question: "How do I book a service?",
    answer: "Click 'Get Started' and select your role as a customer. Browse available services, choose a provider, and confirm your booking. You'll receive instant confirmation."
  },
  {
    question: "Are all service providers verified?",
    answer: "Yes, all service providers on Nexus are verified by our verification team. They undergo background checks and credential verification before joining."
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer: "We offer a satisfaction guarantee. If you're not happy with the service, contact our support team within 24 hours for a refund or rescheduling."
  },
  {
    question: "How do I become a service provider?",
    answer: "Sign up as a Service Provider, complete your profile with relevant credentials, and get verified. You can then start offering services on the platform."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major payment methods including credit/debit cards, digital wallets, and bank transfers for your convenience."
  },
  {
    question: "Is my personal data secure?",
    answer: "Yes, we use industry-standard encryption and security measures to protect your personal and payment information."
  },
];

export default function Index({ onGetStarted }) {
  const navigate = useNavigate();

  // State to handle which FAQ item is expanded dynamically
  const [activeFaq, setActiveFaq] = useState(null);

  // Handle role selection 
  const handleRoleSelect = (role) => {
    if (role.id === "verifier") {
      navigate("/docupload", { state: { role: role.id } });
    } else {
      navigate("/signin", { state: { role: role.id } });
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };


  return (
    <div
      className="min-h-screen w-full relative block clear-both"
      style={{
        background:
          "linear-gradient(135deg, #FFF5E6 0%, #E8F5E9 50%, #FFF8E1 100%)",
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1
            className="text-2xl font-bold"
            style={{
              background: "linear-gradient(135deg, #FF7043, #66BB6A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Nexus
          </h1>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Services
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              About
            </a>
            <a href="#faqs" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              FAQs
            </a>
          </nav>

          <button
            onClick={onGetStarted}
            className="px-5 py-2 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
            style={{
              background: "linear-gradient(135deg, #FF7043, #66BB6A)",
            }}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="pt-20 pb-20 px-6 relative"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/60" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-800 mb-6 border border-white/50">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Trusted by 10,000+ customers
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl" style={{ textShadow: '0 4px 6px rgba(0,0,0,0.5)' }}>
            Home Services,{" "}
            <span className="text-orange-400 drop-shadow-2xl" style={{ textShadow: '0 4px 6px rgba(0,0,0,0.5)' }}>
              Simplified
            </span>
          </h2>

          <p className="text-lg text-white drop-shadow-2xl max-w-2xl mx-auto mb-8" style={{ textShadow: '0 3px 5px rgba(0,0,0,0.4)' }}>
            From AC repairs to deep cleaning, Nexus connects you with verified
            professionals for all your home service needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-3 text-white rounded-full font-medium hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              style={{
                background: "linear-gradient(135deg, #FF7043, #66BB6A)",
              }}
            >
              Book a Service
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3 bg-white/90 backdrop-blur-sm text-gray-800 border border-white rounded-full font-medium hover:bg-white transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Choose Your Role Section */}
      <section className="py-16 px-6 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Choose Your Role
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Select the role that best describes you to get started with Nexus
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROLES.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role)}
                  className="role-card-item p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all text-left border border-gray-200 hover:border-orange-500 group cursor-pointer block opacity-100"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: `${role.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: role.color }} />
                  </div>

                  <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                    {role.label}
                  </h4>

                  <p className="text-sm text-gray-600">
                    {role.description}
                  </p>

                  <div className="mt-4 flex items-center text-sm font-medium text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Get Started <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-transparent relative block">
        <div className="max-w-4xl mx-auto opacity-100">
          <div className="grid grid-cols-3 gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="stat-card-item text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-200 opacity-100"
              >
                <stat.Icon className="w-8 h-8 mx-auto mb-3 text-green-500" />
                <p className="text-2xl md:text-3xl font-bold text-gray-800">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-6 relative block min-h-80">
        <div className="max-w-6xl mx-auto opacity-100">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Our Services
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Quality services delivered by verified professionals at your doorstep
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.name}
                className="service-card-item group p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all cursor-pointer opacity-100"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: service.bgColor }}
                >
                  <service.Icon
                    className="w-7 h-7"
                    style={{ color: service.color }}
                  />
                </div>

                <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-green-500 transition-colors">
                  {service.name}
                </h4>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="relative overflow-hidden rounded-3xl p-12 text-center text-white"
            style={{
              background: "linear-gradient(135deg, #FF7043, #66BB6A)",
            }}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to get started?
              </h3>
              <p className="text-white/90 max-w-xl mx-auto mb-8">
                Join thousands of happy customers who trust Nexus for their
                home service needs.
              </p>
              <button onClick={onGetStarted} className="px-8 py-3 bg-white text-gray-800 rounded-full font-medium hover:shadow-xl transition-all">
                Download the App
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-16 px-6 relative block min-h-80">
        <div className="max-w-4xl mx-auto opacity-100">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600">
              Find answers to common questions about Nexus
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="faq-item bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all opacity-100"
              >
                <button 
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </h4>
                  <ChevronDown className={`w-5 h-5 text-gray-600 shrink-0 transition-transform duration-200 ${activeFaq === index ? "rotate-180" : ""}`} />
                </button>
                
                {activeFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-gray-200 relative block">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span
                className="text-xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #FF7043, #66BB6A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Nexus
              </span>
              <span className="text-gray-500 text-sm">
                | Connecting Services to You
              </span>
            </div>
            <p className="text-gray-500 text-sm">2026 Nexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
