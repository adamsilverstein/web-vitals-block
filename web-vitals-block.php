<?php
/**
 * Plugin Name:     Web Vitals Block
 * Description:     A Web Vitals block.
 * Version:         1.2.0
 * Author:          adamsilverstein
 * License:         Apache
 * License URI:     https://www.apache.org/licenses/LICENSE-2.0
 * Text Domain:     web-vitals-block
 *
 * @package         web-vitals-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function web_vitals_block_init() {
	$dir = dirname( __FILE__ );

	wp_enqueue_script(
		'web-vitals-element',
		plugins_url( 'vendor/web-vitals-element.styled.min.js', __FILE__ ),
		array(),
		filemtime( "$dir/vendor/web-vitals-element.styled.min.js" )
	);

	$script_asset_path = "$dir/build/index.asset.php";
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'web-vitals-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	$editor_css = 'build/index.css';
	wp_register_style(
		'web-vitals-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-web-vitals-block-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'web-vitals/web-vitals-block', array(
		'editor_script' => 'web-vitals-block-editor',
		'editor_style'  => 'web-vitals-block-editor',
		'style'         => 'create-block-web-vitals-block-block',
	) );
}
add_action( 'init', 'web_vitals_block_init' );
