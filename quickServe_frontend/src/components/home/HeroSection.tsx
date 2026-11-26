import { Link } from "react-router-dom";
import { useRef } from "react";
import { Search, ArrowRight, Star, ShieldCheck, Clock } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .from(".hero-content", {
          opacity: 0,
          y: 40,
          duration: 0.8,
        })
        .from(
          ".hero-visual",
          {
            opacity: 0,
            x: 40,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          ".hero-badge",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.4",
        );
    },
    { scope: heroRef },
  );

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-[#f7faf7]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-green-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center justify-center gap-14 px-5 py-20 md:px-8 md:grid-cols-2 lg:gap-16 lg:py-28">
        {/* Left content */}
        <div className="hero-content">
         

          <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Find the right help for{" "}
            <span className="text-green-600">every task.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
            From home repairs to everyday services, connect with skilled
            professionals you can trust. Book easily and get the job done.
          </p>

          {/* Search */}
          <div className="mt-8 flex max-w-xl flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg shadow-gray-200/50 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-3 px-3">
              <Search className="shrink-0 text-green-600" size={22} />

              <input
                type="text"
                placeholder="What service do you need?"
                className="w-full bg-transparent py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
            </div>

            <Link
              to="/services"
              className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
            >
              Find Services
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ShieldCheck size={18} className="text-green-600" />
              Trusted professionals
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={18} className="text-green-600" />
              Easy booking
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star size={18} className="text-green-600" />
              Rated services
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="hero-visual relative mx-auto w-full max-w-lg hidden md:block">
          <div className="relative flex aspect-square items-center justify-center rounded-[2rem] bg-green-500/50 p-8 ">
            {/* Decorative circle */}
            <div className="absolute h-[75%] w-[75%] rounded-full border border-green-200 bg-gradient-to-br from-green-200/80 to-emerald-50" />

            {/* Center illustration placeholder */}
            <div className="relative z-10 flex h-48 w-48 items-center justify-center rounded-full bg-green-600 shadow-2xl shadow-green-900/20 sm:h-60 sm:w-60">
              <div className="text-center text-white">
                <div className="text-6xl sm:text-7xl">🛠️</div>
                <p className="mt-3 text-lg font-bold">QuickServe</p>
                <p className="text-sm text-green-100">Help is on the way</p>
              </div>
            </div>

        
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
