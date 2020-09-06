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


const WebVitalToggleControl = withState()(({ isSet, setState, label, setValue }) => (
	<ToggleControl
		label={ label }
		help={ isSet ? label + ' enabled' : label + ' disabled' }
		checked={isSet}
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
export default function Edit() {
	const [ CLSenabled, setCLSenabled ] = useState( true );
	const [ FCPenabled, setFCPenabled ] = useState( true );
	const [ FIDenabled, setFIDenabled ] = useState( true );
	const [ LCPenabled, setLCPenabled ] = useState( true );
	const [ TTFBenabled, setTTFBenabled ] = useState( true );

	// FID LCP TTFB
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

	return (
		<>
			{
				<InspectorControls>
					<div className="components-panel__body is-opened">
						<WebVitalToggleControl
							label="CLS"
							isSet={ CLSenabled }
							setValue= { setCLSenabled }
						/>
						<WebVitalToggleControl
							label="FCP"
							isSet={ FCPenabled }
							setValue= { setFCPenabled }
						/>
						<WebVitalToggleControl
							label="FID"
							isSet={ FIDenabled }
							setValue= { setFIDenabled }
						/>
						<WebVitalToggleControl
							label="LCP"
							isSet={ LCPenabled }
							setValue= { setLCPenabled }
						/>
						<WebVitalToggleControl
							label="TTFB"
							isSet={ TTFBenabled }
							setValue= { setTTFBenabled }
						/>
					</div>
				</InspectorControls>
			}
			{
				createElement('web-vitals', vitalConfig )
			}
		</>
	);
}
