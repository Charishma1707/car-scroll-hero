<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="wp-car-header">
    <div class="wp-header-container">
        <div class="wp-brand">
            <span class="wp-badge">WP</span>
            <strong><?php bloginfo( 'name' ); ?></strong>
        </div>
        <div class="wp-telemetry">
            <span>TRACK: <strong id="wpTrackPct" style="color: #def54f;">0%</strong></span>
            <span>SPEED: <strong id="wpSpeedVal" style="color: #45db7d;">0 KM/H</strong></span>
        </div>
    </div>
</header>
