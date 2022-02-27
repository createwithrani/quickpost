<?php
/**
 * Plugin Name:     QuickPost
 * Plugin URI:      https://createwithrani.com
 * Description:     Adds an "Add New" button to the Block Editor toolbar, so you can easily create new posts/pages/custom post types, as well as duplicate them.
 * Author:          Aurooba Ahmed
 * Author URI:      https://aurooba.com
 * Text Domain:     createwithrani-quickpost
 * Domain Path:     /languages
 * Version:         0.1.1
 *
 * @package         createwithrani-quickpost
 */

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 */
function createwithrani_quickpost_script() {

	$dir = dirname( __FILE__ );
	$index_js = 'build/index.js';
	$index_css = '/build/index.css';

	// automatically load dependencies and version
	$asset_file = include $dir . '/build/index.asset.php';
	wp_enqueue_script(
		'createwithrani-quickpost-js',
		plugins_url( $index_js, __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);
	wp_set_script_translations( 'createwithrani-quickpost-js' );
	wp_enqueue_style(
		'createwithrani-quickpost-style',
		plugins_url( $index_css, __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . $index_css )
	);
}

add_action( 'enqueue_block_editor_assets', 'createwithrani_quickpost_script' );
