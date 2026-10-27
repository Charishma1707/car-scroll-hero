# ITZFIZZ — Interactive Car Scroll Animation Hero Experience

An ultra-smooth, high-performance recreation of the reference hero section animation ([Live Reference Demo](https://paraschaturvedi.github.io/car-scroll-animation/)), built using **React / Next.js architecture**, **Tailwind CSS**, and **GSAP ScrollTrigger**, alongside a complete standalone **Vanilla Web Technologies** implementation.

---

## 🌟 Live Demo & Quick Reference

| Attribute | Specification |
|---|---|
| **Live Deployment (React)** | [car-scroll-hero.netlify.app](https://car-scroll-hero.netlify.app/) |
| **Live Deployment (Bootstrap)** | [car-scroll-hero.netlify.app/bootstrap.html](https://car-scroll-hero.netlify.app/bootstrap.html) |
| **GitHub Repository** | [github.com/Charishma1707/car-scroll-hero](https://github.com/Charishma1707/car-scroll-hero) |
| **WordPress Theme/Template** | Located in [`/wordpress-theme`](./wordpress-theme) (Ready-to-install custom theme & template) |
| **Bootstrap Edition** | Located in [`/public/bootstrap.html`](./public/bootstrap.html) (Bootstrap 5.3 + GSAP) |
| **Vanilla Alternate** | Pure HTML5, CSS3, Vanilla JS + GSAP (located in [`/vanilla`](./vanilla)) |
| **Reference Inspiration** | [paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation/) |
| **Tech Stack** | React 19, Tailwind CSS, Bootstrap 5.3, WordPress PHP, GSAP 3.12, Vite 6 |
| **Motion Optimization** | GPU-accelerated `translate3d`, `will-change`, zero layout thrashing |
| **Hosting Compatibility** | GitHub Pages, Vercel, Netlify (Relative `./` asset paths) |

---

## 🚀 Quick Start Guide

### Option 1: Run the Modern React + Tailwind + GSAP App

```bash
# 1. Navigate into the project folder
cd car-scroll-hero

# 2. Install dependencies (React 19, GSAP, Tailwind, Lucide)
npm install

# 3. Start the blazing fast Vite development server
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

#### Build for Production (GitHub Pages Ready)
```bash
npm run build
```
The output is written to `/dist` with relative paths (`./assets/...`), ready to be pushed directly to GitHub Pages.

---

### Option 2: Run the Standalone Vanilla Version (Zero Dependencies)

If you prefer inspecting the pure **Vanilla HTML/CSS/JavaScript** build:
1. Open [`vanilla/index.html`](./vanilla/index.html) directly in any browser (Chrome, Edge, Firefox, Safari).
2. Or serve it via any static server:
   ```bash
   npx serve vanilla
   ```

---

## 📋 Requirements & Implementation Architecture

| # | Requirement | Implementation Details | File Location |
|---|---|---|---|
| **1** | **Hero Section Layout** | Occupies 100vh (above the fold). Displays bold letter-spaced headline `W E L C O M E   I T Z F I Z Z`, track surface with race curbs, center asphalt stripes, and 4 floating impact metric badges. | [`src/components/HeroScrollSection.jsx`](./src/components/HeroScrollSection.jsx), [`src/components/MetricCard.jsx`](./src/components/MetricCard.jsx) |
| **2** | **Initial Load Animation** | Orchestrated GSAP timeline on page mount (`power3.out`): road scales into view, car glides from off-screen into the starting gate with headlights powering on, headline letters stagger up with subtle spring bounce, and metrics fade in. | [`src/components/HeroScrollSection.jsx:L100-L148`](./src/components/HeroScrollSection.jsx#L100-L148) |
| **3** | **Scroll-Based Animation (Core)** | Pinned hero track across scroll distance. Car translation is strictly linked to scroll progress (`scrub: 0.8`), ensuring fluid inertia and natural interpolation with no time-based autoplay. | [`src/components/HeroScrollSection.jsx:L150-L215`](./src/components/HeroScrollSection.jsx#L150-L215) |
| **4** | **Dynamic Letter Illumination** | Letters light up dynamically with radiant neon glow as the front bumper of the car crosses each letter's horizontal bounding coordinate. Reverses smoothly on backward scroll. | [`src/components/HeroScrollSection.jsx:L175-L186`](./src/components/HeroScrollSection.jsx#L175-L186) |
| **5** | **Impact Metrics Animation** | 4 stat boxes (`58%`, `23%`, `27%`, `40%`) pop in with custom color accents (`#def54f`, `#6ac9ff`, `#1e2029`, `#fa7328`) and execute a smooth number count-up animation when their scroll milestones are crossed. | [`src/components/MetricCard.jsx`](./src/components/MetricCard.jsx) |
| **6** | **Motion & Performance** | Exclusively uses GPU-composited properties (`translate3d`, `opacity`, `scale`). Geometry is pre-cached on resize to ensure **zero layout reflows/thrashing** during scroll events. | [`src/index.css`](./src/index.css), [`tailwind.config.js`](./tailwind.config.js) |
| **7** | **Web Audio Engine (Bonus)** | Synthesized V8 supercar engine sound using the native Web Audio API (zero external sound files needed). Pitch and volume dynamically modulate with real-time scroll velocity. | [`src/audio/engineSound.js`](./src/audio/engineSound.js) |

---

## 🎨 Visual Design & Color Matrix

The UI matches the aesthetic palette of the reference with elevated luxury automotive styling:

- **Track & Roadway**: `#16171d` deep asphalt with FIA-style red/white curbing (`#e11d48` / `#f8fafc`).
- **Energy Trail**: Vibrant electric lime-green (`#45db7d`) with dynamic inner beam sweep.
- **Metric Card 1**: `#def54f` (Neon Lime) — `58% Increase in pick up point use`
- **Metric Card 2**: `#6ac9ff` (Sky Cyan) — `23% Decreased in customer phone calls`
- **Metric Card 3**: `#1e2029` (Dark Carbon Slate) — `27% Increase in route speed efficiency`
- **Metric Card 4**: `#fa7328` (Hyper Orange) — `40% Decreased turnaround dispatch time`

---

## 🏎️ How the Core Motion Mechanics Work

### 1. Zero-Reflow Letter Detection
In standard implementations, calling `element.getBoundingClientRect()` inside a scroll handler causes continuous **layout thrashing**, dropping frame rates below 30 FPS.

**Our Solution**:
```javascript
// Pre-calculate and cache letter offsets once upon initial load and on resize:
const calculatePositions = () => {
  roadWidth = road.offsetWidth;
  carWidth = car.offsetWidth || 180;
  maxTravel = roadWidth - carWidth + 40;
  const roadRect = road.getBoundingClientRect();
  letterPositions = letters.map((letterEl) => {
    const rect = letterEl.getBoundingClientRect();
    return rect.left - roadRect.left + rect.width / 2;
  });
};

// Inside the scrubbed scroll update loop: ONLY pure numeric comparisons!
const carFrontX = currentCarX + carWidth * 0.75;
letters.forEach((letterEl, i) => {
  if (carFrontX >= letterPositions[i]) {
    letterEl.classList.add('letter-active');
  } else {
    letterEl.classList.remove('letter-active');
  }
});
```

### 2. Smooth Inertia Scrubbing
By configuring GSAP ScrollTrigger with `scrub: 0.8`, the car's horizontal translation catches up to the scroll position with 800ms of dampening easing. This prevents sudden stops and gives the vehicle the feel of physical momentum and weight.

---

## 📁 Project Directory Structure

```
car-scroll-hero/
├── index.html                   # Vite entry with Google Fonts & metadata
├── package.json                 # Project dependencies & build scripts
├── vite.config.js               # Vite config (base: './' for GitHub Pages)
├── tailwind.config.js           # Custom automotive design tokens & colors
├── postcss.config.js            # PostCSS configuration
├── public/
│   └── car.png                  # McLaren 720S top-view high-res transparent PNG
├── src/
│   ├── main.jsx                 # React root bootstrap
│   ├── App.jsx                  # Main coordinator & telemetry pipeline
│   ├── index.css                # Road shaders, curbs, and GPU layer utilities
│   ├── audio/
│   │   └── engineSound.js       # Web Audio API V8 engine synthesizer
│   └── components/
│       ├── Navbar.jsx           # Floating telemetry HUD (Speed, Progress, Audio)
│       ├── HeroScrollSection.jsx# Core pinned GSAP ScrollTrigger animation
│       ├── MetricCard.jsx       # Floating stat cards with count-up logic
│       ├── FeatureSection.jsx   # Architectural specs & compliance matrix
│       └── Footer.jsx           # Clean footer & links
├── vanilla/                     # Standalone Vanilla Web Technologies build
│   ├── index.html               # Pure HTML5 entry
│   ├── style.css                # Pure CSS3 styles & animations
│   ├── script.js                # Pure Vanilla JS + GSAP ScrollTrigger
│   └── car.png                  # Car asset
└── dist/                        # Production build artifacts (GitHub Pages ready)
```

---

## 🌐 GitHub Pages Deployment Instructions

Hosting this project on **GitHub Pages** takes less than 2 minutes:

### Method A: Deploy via GitHub Actions (Recommended)
1. Push this folder to a GitHub repository.
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Select the standard **Static HTML** or **Vite** action.
5. GitHub will automatically build and publish your site!

### Method B: Deploy via the `dist` Folder
1. Run `npm run build` locally.
2. Push the contents of the `dist/` directory to the `gh-pages` branch:
   ```bash
   git add dist -f
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix car-scroll-hero/dist origin gh-pages
   ```
3. Set GitHub Pages source to the `gh-pages` branch.

### Method C: Deploy the Vanilla Version
1. Simply enable GitHub Pages on the `vanilla` folder or copy `vanilla/` contents to the root of a branch.

---

## ✅ Evaluation Checklist

- [x] Hero section occupies first screen above fold
- [x] Letter-spaced headline `W E L C O M E   I T Z F I Z Z`
- [x] Impact metrics (58%, 23%, 27%, 40%) with short descriptions
- [x] Initial load animation with smooth easing and staggered delays
- [x] Scroll-based car animation tied directly to scroll progress
- [x] Smooth easing & interpolation (`scrub: 0.8`)
- [x] Transform properties (`translate3d`, `opacity`, `scale`) for 60fps performance
- [x] Zero layout reflows on scroll
- [x] Mandatory tech stack implemented (HTML, CSS, JS, GSAP, React, Tailwind)
- [x] Standalone Vanilla implementation included in `/vanilla`
- [x] Production build tested and verified
