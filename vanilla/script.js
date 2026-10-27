// Vanilla GSAP ScrollTrigger Car Animation
gsap.registerPlugin(ScrollTrigger);

const carContainer = document.getElementById("carContainer");
const trail = document.getElementById("trail");
const letters = gsap.utils.toArray(".value-letter");
const valueAdd = document.getElementById("valueText");
const road = document.getElementById("road");
const scrollPctEl = document.getElementById("scrollPct");
const speedValEl = document.getElementById("speedVal");

// Cache geometry to prevent layout thrashing on scroll
let roadWidth = road.offsetWidth;
const carWidth = 180;
let endX = window.innerWidth - carWidth + 40;
let letterOffsets = [];

function updateMetrics() {
  roadWidth = road.offsetWidth;
  endX = window.innerWidth - carWidth + 40;
  const roadRect = road.getBoundingClientRect();
  letterOffsets = letters.map((letter) => {
    const rect = letter.getBoundingClientRect();
    return rect.left - roadRect.left + rect.width / 2;
  });
}

updateMetrics();
window.addEventListener("resize", updateMetrics);

// 1. Initial Load Animation
window.addEventListener("DOMContentLoaded", () => {
  const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  introTl
    .fromTo(
      letters,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 0.15, stagger: 0.04, duration: 0.8, ease: "back.out(1.4)" }
    )
    .fromTo(
      carContainer,
      { x: -160, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(
      ".text-box",
      { y: 25, opacity: 0, scale: 0.88 },
      {
        y: 0,
        opacity: 0.95,
        scale: 1,
        stagger: 0.16, // Animate in one by one with subtle delay
        duration: 0.65,
        ease: "back.out(1.3)",
        onComplete: () => {
          boxes.forEach((b) => {
            const el = document.querySelector(b.id);
            if (el) {
              const numEl = el.querySelector(".num-box");
              animateCount(numEl, b.target);
            }
          });
        },
      },
      "-=0.4"
    );
});

// 2. Scroll-Based Animation (Core Feature)
let lastCarX = 0;
let lastTime = performance.now();

gsap.to(carContainer, {
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "bottom top",
    scrub: 0.8, // Smooth inertia
    pin: ".track",
    onUpdate: (self) => {
      const progress = self.progress;
      const carX = progress * endX;

      // Telemetry
      if (scrollPctEl) scrollPctEl.textContent = Math.round(progress * 100) + "%";

      // Speed calculation
      const now = performance.now();
      const dt = Math.max(now - lastTime, 16);
      const dx = Math.abs(carX - lastCarX);
      const velocity = Math.min((dx / dt) * 1.8, 1);
      lastCarX = carX;
      lastTime = now;
      if (speedValEl) speedValEl.textContent = Math.round(velocity * 340) + " KM/H";

      // Car front tip for illuminating letters
      const carFrontX = carX + carWidth * 0.7;

      letters.forEach((letter, i) => {
        const letterX = letterOffsets[i];
        if (carFrontX >= letterX) {
          letter.classList.add("letter-active");
        } else {
          letter.classList.remove("letter-active");
        }
      });

      // Trail expansion behind car
      gsap.set(trail, { width: carX + carWidth * 0.45 });
    },
  },
  x: endX,
  ease: "none",
});

// 3. Staggered Stat Cards on Scroll Progress
const boxes = [
  { id: "#box1", start: "top+=250 top", end: "top+=450 top", target: 58 },
  { id: "#box2", start: "top+=450 top", end: "top+=650 top", target: 23 },
  { id: "#box3", start: "top+=650 top", end: "top+=850 top", target: 27 },
  { id: "#box4", start: "top+=850 top", end: "top+=1050 top", target: 40 },
];

boxes.forEach((box) => {
  const el = document.querySelector(box.id);
  const numEl = el.querySelector(".num-box");

  ScrollTrigger.create({
    trigger: ".section",
    start: box.start,
    end: box.end,
    scrub: 0.5,
    onEnter: () => {
      el.classList.add("show");
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.3 });
      animateCount(numEl, box.target);
    },
    onLeaveBack: () => {
      gsap.to(el, { opacity: 0.3, scale: 0.95, duration: 0.3 });
    },
  });
});

function animateCount(elem, target) {
  let obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 0.8,
    ease: "power2.out",
    onUpdate: () => {
      elem.textContent = Math.round(obj.val) + "%";
    },
  });
}
