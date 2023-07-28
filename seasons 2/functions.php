<?php

/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package seasons
 * @since 1.0.0
 */

/**
 * The theme version.
 *
 * @since 1.0.0
 */
define('SEASONS_VERSION', wp_get_theme()->get('Version'));

/**
 * Add theme support for block styles and editor style.
 *
 * @since 1.0.0
 *
 * @return void
 */
function seasons_setup()
{
	add_editor_style('./assets/css/style-shared.min.css');

	/*
	 * Load additional block styles.
	 * See details on how to add more styles in the readme.txt.
	 */
	$styled_blocks = ['button', 'quote', 'navigation'];
	foreach ($styled_blocks as $block_name) {
		$args = array(
			'handle' => "seasons-$block_name",
			'src'    => get_theme_file_uri("assets/css/blocks/$block_name.min.css"),
			'path'   => get_theme_file_path("assets/css/blocks/$block_name.min.css"),
		);
		// Replace the "core" prefix if you are styling blocks from plugins.
		wp_enqueue_block_style("core/$block_name", $args);
	}
}
add_action('after_setup_theme', 'seasons_setup');

/**
 * Enqueue the CSS files.
 *
 * @since 1.0.0
 *
 * @return void
 */
function seasons_styles()
{
	wp_enqueue_style(
		'seasons-style',
		get_stylesheet_uri(),
		[],
		SEASONS_VERSION
	);
	wp_enqueue_style(
		'seasons-shared-styles',
		get_theme_file_uri('assets/css/style-shared.min.css'),
		[],
		SEASONS_VERSION
	);
}
add_action('wp_enqueue_scripts', 'seasons_styles');

function bpf_theme_setup()
{
	add_theme_support('post-formats', array(
		'aside',   // title-less blurb
		'gallery', // gallery of images
		'link',    // quick link to other site
		'image',   // an image
		'quote',   // a quick quote
		'status',  // a Facebook-like status update
		'video',   // video
		'audio',   // audio
		'chat',   // chat
	), 'bpf');
}
add_action('after_setup_theme', 'bpf_theme_setup');

// Enqueue Dashicons to load on the front-end

add_action('wp_enqueue_scripts', 'dashicons_front_end');

// Display dashicons on front of site
function dashicons_front_end()
{

	wp_enqueue_style('dashicons');
}

// Filters.
require_once get_theme_file_path('inc/filters.php');

// Block variation example.
require_once get_theme_file_path('inc/register-block-variations.php');

// Block style examples.
require_once get_theme_file_path('inc/register-block-styles.php');

// Block pattern and block category examples.
require_once get_theme_file_path('inc/register-block-patterns.php');

// Add aside, chat, and status post formats to the post editor.
function fse_pf_blocks_scripts()
{

	wp_enqueue_style('fse-pf-blocks-style', get_template_directory_uri() . '/blocks/block-styles.css');
	wp_enqueue_script('fse-pf-blocks-script', get_template_directory_uri() . '/blocks/block-script.js', array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-data'), '1.0.0', true);
}
add_action('enqueue_block_editor_assets', 'fse_pf_blocks_scripts');
