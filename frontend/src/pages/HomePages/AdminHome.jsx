import { useNavigate } from "react-router-dom";
import { LogOut, Settings, User, Bell, ArrowRight, BarChart3, Users, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AdminHome() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".action-card");
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll(".stat-item");
        gsap.from(items, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.6,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #FFEBEE 0%, #FFF3E0 50%, #FFF8E1 100%)",
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-b border-gray-100/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1
            className="text-2xl font-bold"
            style={{
              background: "linear-gradient(135deg, #E53935, #F57C00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Nexus Admin
          </h1>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 inline mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Welcome, Admin!
          </h2>
          <p className="text-lg text-gray-600">
            Manage platform users and analytics
          </p>
        </div>
      </section>

      {/* Actions Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: "Users", icon: "👥" },
              { title: "Analytics", icon: "📈" },
              { title: "Reports", icon: "📊" },
              { title: "Settings", icon: "⚙️" },
            ].map((action, idx) => (
              <div
                key={idx}
                className="action-card p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="text-4xl mb-4">{action.icon}</div>
                <h3 className="font-bold text-gray-800 mb-3">{action.title}</h3>
                <div className="flex items-center text-red-600 text-sm font-medium">
                  View <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto" ref={statsRef}>
          <div className="grid grid-cols-3 gap-6">
            <div className="stat-item text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50">
              <Users className="w-8 h-8 mx-auto mb-3 text-red-600" />
              <p className="text-2xl md:text-3xl font-bold text-gray-800">5.2K</p>
              <p className="text-sm text-gray-500 mt-1">Total Users</p>
            </div>
            <div className="stat-item text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-red-600" />
              <p className="text-2xl md:text-3xl font-bold text-gray-800">₹1.25L</p>
              <p className="text-sm text-gray-500 mt-1">Total Revenue</p>
            </div>
            <div className="stat-item text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50">
              <BarChart3 className="w-8 h-8 mx-auto mb-3 text-red-600" />
              <p className="text-2xl md:text-3xl font-bold text-gray-800">98.5%</p>
              <p className="text-sm text-gray-500 mt-1">Platform Health</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
