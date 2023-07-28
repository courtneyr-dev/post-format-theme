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

add_theme_support('editor-color-palette');
add_theme_support('block-templates');



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

// Add aside, chat, and status post formats to the post editor.
function fse_pf_blocks_scripts()
{
	wp_enqueue_style('fse-pf-blocks-style', get_template_directory_uri() . '/blocks/block-styles.css');
	wp_enqueue_script(
		'fse-pf-blocks-script',
		get_template_directory_uri() . '/blocks/block-script-transpiled.js',
		array('wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-data'),
		filemtime(get_theme_file_path('/blocks/block-script-transpiled.js')),
		true,
		array('type' => 'module') // Add this line
	);
}
add_action('enqueue_block_editor_assets', 'fse_pf_blocks_scripts');

add_theme_support('block-templates');

// Add support for post formats.
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

function set_post_format_and_template($post_id)
{
	// Get the post object
	$post = get_post($post_id);
	// Get the blocks from the post content
	$blocks = parse_blocks($post->post_content);
	// Check if the first block is an audio block
	if (isset($blocks[0])) {
		switch ($blocks[0]['blockName']) {
			case 'core/audio':
				// Set the post format to audio
				set_post_format($post_id, 'audio');
				// Set the post template to content-audio.html
				update_post_meta($post_id, '_wp_page_template', 'block-templates/content-audio.html');
				break;
			case 'core/video':
				// Set the post format to video
				set_post_format($post_id, 'video');
				// Set the post template to content-video.html
				update_post_meta($post_id, '_wp_page_template', 'block-templates/content-video.html');
				break;
			case 'core/image':
				// Set the post format to image
				set_post_format($post_id, 'image');
				// Set the post template to content-image.html
				update_post_meta($post_id, '_wp_page_template', 'block-templates/content-image.html');
				break;
			case 'core/gallery':
				// Set the post format to gallery
				set_post_format($post_id, 'gallery');
				// Set the post template to content-gallery.html
				update_post_meta($post_id, '_wp_page_template', 'block-templates/content-gallery.html');
				break;
			case 'core/quote':
				// Set the post format to quote
				set_post_format($post_id, 'quote');
				// Set the post template to content-quote.html
				update_post_meta($post_id, '_wp_page_template', 'block-templates/content-quote.html');
				break;
			case 'core/embed':
				// Set the post format to link
				set_post_format($post_id, 'link');
				// Set the post template to content-link.html
				update_post_meta($post_id, '_wp_page_template', 'block-templates/content-link.html');
				break;
			case 'seasons/aside':
				// Set the post format to aside
				set_post_format($post_id, 'aside');
				// Set the post template to content-aside.html
				update_post_meta($post_id, '_wp_page_template', 'block-templates/content-aside.html');
				break;
			case 'seasons/status':
				// Set the post format to status
				set_post_format($post_id, 'status');
				// Set the post template to content-status.html
				update_post_meta($post_id, '_wp_page_template', 'block-templates/content-status.html');
				break;
			case 'seasons/chat-log':
				// Set the post format to chat
				set_post_format($post_id, 'chat');
				// Set the post template to content-status.html
				update_post_meta($post_id, '_wp_page_template', 'block-templates/content-chat.html');
				break;
			default:
				// Set the post format to standard
				set_post_format($post_id, 'standard');
				break;
		}
	}
}
add_action('save_post', 'set_post_format_and_template');

function seasons_template_include($template)
{
	if (is_singular()) {
		$post_format = get_post_format();
		if ($post_format) {
			$template = locate_template("block-templates/content-{$post_format}.html");
		}
	}
	return $template;
}
add_filter('template_include', 'seasons_template_include');

// Add support for chat log block color backgrounds
function seasons_enqueue_scripts()
{
	// Enqueue apply-colors.js for the block editor
	wp_enqueue_script(
		'seasons-apply-colors',
		get_template_directory_uri() . '/blocks/src/scripts/apply-colors.js',
		array('wp-blocks', 'wp-dom-ready', 'wp-editor'),
		filemtime(get_template_directory() . '/blocks/src/scripts/apply-colors.js'),
		true
	);
}
add_action('enqueue_block_editor_assets', 'seasons_enqueue_scripts');

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
