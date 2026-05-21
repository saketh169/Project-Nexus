// SplashScreen Component - Animated intro screen with rotating service and customer circles
// Features: GSAP animations, SVG lines connecting services to customers, responsive dimensions
// Prop: onComplete - callback when splash animation finishes

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import {
  Snowflake,
  Bike,
  ChefHat,
  Home,
  Wrench,
  Zap,
  Bug,
  Paintbrush,
  User,
} from "lucide-react";

// Service icons for outer ring animation
const SERVICES = [
  { Icon: Snowflake, color: "#FF5722", label: "AC Repair" },
  { Icon: Bike, color: "#2196F3", label: "Bike Repair" },
  { Icon: ChefHat, color: "#4CAF50", label: "Kitchen" },
  { Icon: Home, color: "#FF9800", label: "Cleaning" },
  { Icon: Wrench, color: "#9C27B0", label: "Plumber" },
  { Icon: Zap, color: "#FFC107", label: "Electric" },
  { Icon: Bug, color: "#F44336", label: "Pest Control" },
  { Icon: Paintbrush, color: "#00BCD4", label: "Painting" },
];

// Customer avatars for inner ring animation
const CUSTOMERS = [
  { color: "#E91E63" },
  { color: "#3F51B5" },
  { color: "#009688" },
  { color: "#795548" },
  { color: "#607D8B" },
];

export function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const servicesRef = useRef([]);
  const customersRef = useRef([]);
  const nexusRef = useRef(null);
  const svgRef = useRef(null);
  const linesGroupRef = useRef(null);
  const rotationRef = useRef({ outer: 0, inner: 0 });
  const animationRef = useRef(null);

  // Calculate responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Responsive oval dimensions - increased vertical height slightly
  const outerRadiusX = Math.max(dimensions.width * 0.35, 150);
  const outerRadiusY = Math.max(dimensions.height * 0.30, 100);
  const innerRadiusX = Math.max(dimensions.width * 0.15, 60);
  const innerRadiusY = Math.max(dimensions.height * 0.15, 55);

  const updatePositions = useCallback(() => {
    const { outer, inner } = rotationRef.current;

    servicesRef.current.forEach((el, i) => {
      if (!el) return;
      const baseAngle = (i / SERVICES.length) * Math.PI * 2 - Math.PI / 2;
      const angle = baseAngle + outer;
      const x = Math.cos(angle) * outerRadiusX;
      const y = Math.sin(angle) * outerRadiusY;
      el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });

    customersRef.current.forEach((el, i) => {
      if (!el) return;
      const baseAngle = (i / CUSTOMERS.length) * Math.PI * 2 - Math.PI / 2;
      const angle = baseAngle + inner;
      const x = Math.cos(angle) * innerRadiusX;
      const y = Math.sin(angle) * innerRadiusY;
      el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });

    if (linesGroupRef.current && phase >= 3) {
      const lines = linesGroupRef.current.querySelectorAll("line");
      let lineIndex = 0;
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      // Connect all 8 services to all 5 customers
      SERVICES.forEach((_, si) => {
        const serviceAngle =
          (si / SERVICES.length) * Math.PI * 2 - Math.PI / 2 + outer;
        const sx = centerX + Math.cos(serviceAngle) * outerRadiusX;
        const sy = centerY + Math.sin(serviceAngle) * outerRadiusY;

        CUSTOMERS.forEach((_, ci) => {
          const customerAngle =
            (ci / CUSTOMERS.length) * Math.PI * 2 - Math.PI / 2 + inner;
          const cx = centerX + Math.cos(customerAngle) * innerRadiusX;
          const cy = centerY + Math.sin(customerAngle) * innerRadiusY;

          const line = lines[lineIndex];
          if (line) {
            line.setAttribute("x1", `${sx}`);
            line.setAttribute("y1", `${sy}`);
            line.setAttribute("x2", `${cx}`);
            line.setAttribute("y2", `${cy}`);
          }
          lineIndex++;
        });
      });
    }
  }, [phase, outerRadiusX, outerRadiusY, innerRadiusX, innerRadiusY]);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (phase >= 1 && phase < 4) {
        rotationRef.current.outer += delta * 0.3;
      }
      if (phase >= 2 && phase < 4) {
        rotationRef.current.inner -= delta * 0.5;
      }

      updatePositions();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [phase, updatePositions]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(containerRef.current, { opacity: 1, duration: 0.5 });

    tl.add(() => setPhase(1));
    servicesRef.current.forEach((el, i) => {
      if (el) {
        tl.fromTo(
          el,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
          `-=${i > 0 ? 0.2 : 0}`
        );
      }
    });

    tl.add(() => setPhase(2), "+=0.3");
    customersRef.current.forEach((el, i) => {
      if (el) {
        tl.fromTo(
          el,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.7)" },
          `-=${i > 0 ? 0.15 : 0}`
        );
      }
    });

    tl.add(() => setPhase(3), "+=0.5");
    if (linesGroupRef.current) {
      const lines = linesGroupRef.current.querySelectorAll("line");
      lines.forEach((line, i) => {
        tl.to(
          line,
          { opacity: 0.6, strokeDashoffset: 0, duration: 0.05, ease: "power2.out" },
          `-=${i > 0 ? 0.01 : 0}`
        );
      });
    }

    tl.add(() => setPhase(4), "+=2");

    servicesRef.current.forEach((el) => {
      if (el) {
        tl.to(el, { scale: 0, opacity: 0, duration: 0.6, ease: "power2.in" }, "<");
      }
    });
    customersRef.current.forEach((el) => {
      if (el) {
        tl.to(
          el,
          { scale: 0, opacity: 0, duration: 0.6, ease: "power2.in" },
          "<"
        );
      }
    });
    if (linesGroupRef.current) {
      tl.to(linesGroupRef.current, { opacity: 0, duration: 0.4 }, "<");
    }

    tl.fromTo(
      nexusRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
      "-=0.2"
    );

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 1.5,
      onComplete: () => onComplete(),
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden opacity-0"
      style={{
        background:
          "linear-gradient(135deg, #FFF8E1 0%, #FFECB3 30%, #C8E6C9 60%, #B3E5FC 100%)",
      }}
    >
      {/* Connection lines SVG */}
      <svg
        ref={svgRef}
        className="absolute pointer-events-none"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g ref={linesGroupRef}>
          {SERVICES.map((service, si) =>
            CUSTOMERS.map((_, ci) => (
              <line
                key={`${si}-${ci}`}
                x1="0"
                y1="0"
                x2="0"
                y2="0"
                stroke={service.color}
                strokeWidth="1"
                strokeDasharray="0"
                strokeDashoffset="0"
                opacity="0"
                filter="url(#glow)"
                strokeLinecap="round"
              />
            ))
          )}
        </g>
        {/* Outer oval ring */}
        <ellipse
          cx={dimensions.width / 2}
          cy={dimensions.height / 2}
          rx={outerRadiusX}
          ry={outerRadiusY}
          fill="none"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="2"
          strokeDasharray="12 6"
        />
        {/* Inner oval ring */}
        <ellipse
          cx={dimensions.width / 2}
          cy={dimensions.height / 2}
          rx={innerRadiusX}
          ry={innerRadiusY}
          fill="none"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="2"
          strokeDasharray="8 4"
        />
      </svg>

      {/* Services */}
      {SERVICES.map((service, i) => {
        const baseAngle = (i / SERVICES.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(baseAngle) * outerRadiusX;
        const y = Math.sin(baseAngle) * outerRadiusY;
        return (
          <div
            key={`service-${i}`}
            ref={(el) => {
              servicesRef.current[i] = el;
            }}
            className="absolute flex flex-col items-center opacity-0"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(255,255,255,0.95)",
                border: `3px solid ${service.color}`,
              }}
            >
              <service.Icon
                className="w-12 h-12"
                style={{ color: service.color }}
              />
            </div>
            <span
              className="mt-1.5 text-[10px] font-bold whitespace-nowrap px-2 py-0.5 rounded-full shadow-sm"
              style={{
                color: "white",
                backgroundColor: service.color,
              }}
            >
              {service.label}
            </span>
          </div>
        );
      })}

      {/* Customers */}
      {CUSTOMERS.map((customer, i) => {
        const baseAngle = (i / CUSTOMERS.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(baseAngle) * innerRadiusX;
        const y = Math.sin(baseAngle) * innerRadiusY;
        return (
          <div
            key={`customer-${i}`}
            ref={(el) => {
              customersRef.current[i] = el;
            }}
            className="absolute opacity-0"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: customer.color }}
            >
              <User className="w-10 h-10 text-white" />
            </div>
          </div>
        );
      })}

      {/* NEXUS text */}
      <div ref={nexusRef} className="absolute flex flex-col items-center opacity-0">
        <h1
          className="text-7xl md:text-9xl font-black tracking-tight"
          style={{
            background:
              "linear-gradient(135deg, #FF5722 0%, #FF9800 35%, #4CAF50 65%, #2196F3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 4px 20px rgba(255, 87, 34, 0.3))",
          }}
        >
          NEXUS
        </h1>
        <p className="mt-3 text-xl text-gray-600 font-medium tracking-wide">
          Connecting Services to You
        </p>
      </div>

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-8 right-8 px-5 py-2 bg-white/80 hover:bg-white text-gray-800 font-semibold rounded-full shadow-md transition-all duration-300 hover:shadow-lg"
      >
        Skip
      </button>
    </div>
  );
}
