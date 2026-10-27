<?php
/**
 * Car Scroll Hero Theme Functions
 *
 * @package CarScrollHero
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

function car_scroll_hero_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
}
add_action( 'after_setup_theme', 'car_scroll_hero_setup' );

function car_scroll_hero_enqueue_scripts() {
    // Google Fonts
    wp_enqueue_style( 'car-scroll-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;600;700&family=Outfit:wght@700;800;900&display=swap', array(), null );

    // Main Theme Stylesheet
    wp_enqueue_style( 'car-scroll-main-style', get_stylesheet_uri(), array(), '1.0.0' );

    // Custom Animation Stylesheet
    wp_enqueue_style( 'car-scroll-animation-style', get_template_directory_uri() . '/assets/car-scroll.css', array(), '1.0.0' );

    // External GSAP & ScrollTrigger Libraries
    wp_enqueue_script( 'gsap-core', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', array(), '3.12.5', true );
    wp_enqueue_script( 'gsap-scrolltrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', array( 'gsap-core' ), '3.12.5', true );

    // Main Scroll Animation Logic
    wp_enqueue_script( 'car-scroll-custom-script', get_template_directory_uri() . '/assets/car-scroll.js', array( 'gsap-core', 'gsap-scrolltrigger' ), '1.0.0', true );

    // Pass template directory URI for dynamic asset loading
    wp_localize_script( 'car-scroll-custom-script', 'CarScrollData', array(
        'themeUrl' => get_template_directory_uri(),
        'ajaxUrl'  => admin_url( 'admin-ajax.php' )
    ) );
}
add_action( 'wp_enqueue_scripts', 'car_scroll_hero_enqueue_scripts' );
