# Car Scroll Hero — WordPress Theme & Template Implementation

This folder contains a complete, production-ready WordPress custom theme and custom page template recreating the interactive GSAP car scroll hero section.

---

## 📁 WordPress Files Structure

```text
wordpress-theme/car-scroll-hero/
├── style.css             # Theme metadata & base responsive styles
├── functions.php         # Enqueues GSAP 3.12, ScrollTrigger, fonts, and custom scripts
├── header.php            # Dynamic WordPress header with telemetry badges
├── footer.php            # Semantic footer with wp_footer() hooks
├── index.php             # Main homepage template with pinned scroll animation
├── page-car-scroll.php   # Custom Page Template ("Template Name: Car Scroll Hero Template")
└── assets/
    ├── car.png           # Vehicle visual asset
    ├── car-scroll.css    # Scoped animation styles, road, and kinetic neon trail
    └── car-scroll.js     # GSAP ScrollTrigger timeline and real-time velocity calculations
```

---

## ⚙️ Installation & Usage in WordPress

### Option 1: Install as a Full Custom Theme
1. Zip the `car-scroll-hero` directory into `car-scroll-hero.zip`.
2. In the WordPress Admin Dashboard, navigate to **Appearance** > **Themes** > **Add New Theme** > **Upload Theme**.
3. Upload `car-scroll-hero.zip` and click **Activate**.

### Option 2: Use as a Custom Page Template
1. Copy the `car-scroll-hero` folder into your existing theme directory: `/wp-content/themes/<your-active-theme>/`.
2. In WordPress Admin, create a new Page (**Pages** > **Add New**).
3. Under **Page Attributes** in the right sidebar, select **Template** > **Car Scroll Hero Template**.
4. Publish the page to view the live GSAP scrub animation.
