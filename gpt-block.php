<?php
/**
 * Plugin Name:       GPT Block
 * Description:       Custom Block with ChatGPT Integration
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Chee Studio
 * Author URI:        https://chee.studio
 * Plugin URI:        https://github.com/cheestudio/chatgpt-wordpress-block
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gpt-block
 *
 * @package           gptblock
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function gptblock_gpt_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'gptblock_gpt_block_block_init' );
