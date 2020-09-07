/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { createElement } from '@wordpress/element';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const parsedAttributes = [];
	Object.entries( attributes ).map( ( v ) => {
		if ( v[ 1 ] ) {
			parsedAttributes[ v[0] ] = 'true';
		}
	} );
	return (
		createElement('web-vitals', parsedAttributes )
	);
}
