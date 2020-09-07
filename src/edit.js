/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

import { InspectorControls } from "@wordpress/block-editor";
import { ToggleControl } from "@wordpress/components";
import { withState } from "@wordpress/compose";
import { useState, createElement } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";


const WebVitalToggleControl = withState()(({ isSet, label, setValue }) => (
	<ToggleControl
		label={ label }
		help={ isSet ? label + ' enabled' : label + ' disabled' }
		checked={ isSet }
		onChange={() => {
			setValue( ! isSet );
		} }
	/>
));

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const [ CLSenabled, setCLSenabled ] = useState( attributes.cls );
	const [ FCPenabled, setFCPenabled ] = useState( attributes.fcp );
	const [ FIDenabled, setFIDenabled ] = useState( attributes.fid );
	const [ LCPenabled, setLCPenabled ] = useState( attributes.lcp );
	const [ TTFBenabled, setTTFBenabled ] = useState( attributes.ttfb );

	let vitalConfig = {};
	if ( CLSenabled ) {
		vitalConfig.cls = true;
	}
	if ( FCPenabled ) {
		vitalConfig.fcp = true;
	}
	if ( FIDenabled ) {
		vitalConfig.fid = true;
	}
	if ( LCPenabled ) {
		vitalConfig.lcp = true;
	}
	if ( TTFBenabled ) {
		vitalConfig.ttfb = true;
	}

	const toggleValue = ( setter, isSet, key ) => {
		setter( isSet );
		setAttributes( { [key]: isSet } );

		// Force the custom element to refresh.
		setAttributes( { isRefreshing: true } );
		setTimeout( () => { setAttributes( { isRefreshing: false } ); } );
	}
	return (
		<>
			{
				<InspectorControls>
					<div className="components-panel__body is-opened">
						<WebVitalToggleControl
							label="CLS"
							isSet={ CLSenabled }
							setValue= { ( isSet ) => {
								toggleValue( setCLSenabled, isSet, 'cls' );
							} }
						/>
						<WebVitalToggleControl
							label="FCP"
							isSet={ FCPenabled }
							setValue= { ( isSet ) => {
								toggleValue( setFCPenabled, isSet, 'fcp' );
							} }
						/>
						<WebVitalToggleControl
							label="FID"
							isSet={ FIDenabled }
							setValue= { ( isSet ) => {
								toggleValue( setFIDenabled, isSet, 'fid' );
							} }
						/>
						<WebVitalToggleControl
							label="LCP"
							isSet={ LCPenabled }
							setValue= { ( isSet ) => {
								toggleValue( setLCPenabled, isSet, 'lcp' );
							} }
						/>
						<WebVitalToggleControl
							label="TTFB"
							isSet={ TTFBenabled }
							setValue= { ( isSet ) => {
								toggleValue( setTTFBenabled, isSet, 'ttfb' );
							} }
						/>
					</div>
				</InspectorControls>
			}
			{
				attributes.isRefreshing ? null : createElement('web-vitals', vitalConfig )
			}
		</>
	);
}
