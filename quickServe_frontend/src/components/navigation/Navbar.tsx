import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowRight, Zap } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  // GSAP entrance animation
  useGSAP(
    () => {
      const timeline = gsap.timeline();

      timeline
        .from(".navbar-logo", {
          y: -20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(
          ".navbar-links a",
          {
            y: -15,
            opacity: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .from(
          ".navbar-actions",
          {
            y: -15,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2",
        );
    },
    { scope: navbarRef },
  );

///////// click on logo --- function 
  const closeMenu = () => setIsMenuOpen(false);
  /////////////////
  
  
  return (
    <header
      ref={navbarRef}
      className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="navbar-logo flex items-center gap-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
            <Zap size={22} fill="currentColor" />
          </span>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            Quick<span className="text-green-600">Serve</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="navbar-links hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-green-600"
                  : "text-gray-600 hover:text-green-600"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-green-600"
                  : "text-gray-600 hover:text-green-600"
              }`
            }
          >
            Find Services
          </NavLink>

          <Link
            to="/register"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-green-600"
          >
            Become a Provider
          </Link>
        </div>

        {/* Desktop actions */}
        <div className="navbar-actions hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          <NavLink
            to="/"
            onClick={closeMenu}
            className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            Home
          </NavLink>

          <NavLink
            to="/services"
            onClick={closeMenu}
            className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            Find Services
          </NavLink>

          <Link
            to="/register"
            onClick={closeMenu}
            className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            Become a Provider
          </Link>

          <div className="mt-2 flex gap-3 border-t border-gray-100 pt-4">
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-center text-sm font-semibold text-gray-700"
            >
              Log in
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
