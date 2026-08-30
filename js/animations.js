gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-title", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out",
});
