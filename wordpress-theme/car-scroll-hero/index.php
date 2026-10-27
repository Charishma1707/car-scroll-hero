<?php
/**
 * Main Template File & Front Page
 *
 * @package CarScrollHero
 */

get_header(); ?>

<main class="wp-scroll-main">
    <div class="wp-scroll-track-pin" id="wpScrollArea">
        <div class="wp-track-viewport">
            <div class="wp-headline-container">
                <span class="wp-subheading">KINETIC SCROLL EXPERIENCE</span>
                <h1 class="wp-hero-title">
                    <span class="wp-char">W</span>
                    <span class="wp-char">E</span>
                    <span class="wp-char">L</span>
                    <span class="wp-char">C</span>
                    <span class="wp-char">O</span>
                    <span class="wp-char">M</span>
                    <span class="wp-char">E</span>
                    <span class="wp-char-space">&nbsp;</span>
                    <span class="wp-char">T</span>
                    <span class="wp-char">O</span>
                    <span class="wp-char-space">&nbsp;</span>
                    <span class="wp-char wp-highlight">F</span>
                    <span class="wp-char wp-highlight">I</span>
                    <span class="wp-char wp-highlight">Z</span>
                    <span class="wp-char wp-highlight">Z</span>
                </h1>
            </div>

            <div class="wp-road" id="wpRoad">
                <div class="wp-road-line"></div>
                <div class="wp-trail" id="wpTrail"></div>
                <div class="wp-car-wrapper" id="wpCar">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/car.png' ); ?>" alt="Supercar" class="wp-car-img" />
                </div>
            </div>

            <div class="wp-metrics-grid">
                <div class="wp-metric-box">
                    <small>ACCELERATION</small>
                    <div class="wp-metric-val">2.8s</div>
                    <span>0-100 km/h</span>
                </div>
                <div class="wp-metric-box">
                    <small>TOP SPEED</small>
                    <div class="wp-metric-val" style="color: #def54f;">341</div>
                    <span>KM/H</span>
                </div>
                <div class="wp-metric-box">
                    <small>HORSEPOWER</small>
                    <div class="wp-metric-val" style="color: #38bdf8;">720 PS</div>
                    <span>Twin Turbo V8</span>
                </div>
            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>
