/**
 * Generate a Sprite Sheet from an Adobe Photoshop Animation.
 *
 * Created by Rocket Pack Ltd, http://rocketpack.fi/
 *
 * Released under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
 */

/**
 * Select the first frame of an animation
 */
function rpSelectFirstFrame() {
	var idanimationFrameActivate = stringIDToTypeID( "animationFrameActivate" );
	var desc = new ActionDescriptor();
	var idnull = charIDToTypeID( "null" );
	var ref = new ActionReference();
	var idanimationFrameClass = stringIDToTypeID( "animationFrameClass" );
	var idOrdn = charIDToTypeID( "Ordn" );
	var idFrst = charIDToTypeID( "Frst" );
	ref.putEnumerated( idanimationFrameClass, idOrdn, idFrst );
	desc.putReference( idnull, ref );
	executeAction( idanimationFrameActivate, desc, DialogModes.NO );
}

/**
 * Convert an animation to layers, one layer per frame
 */
function rpConvertAnimationToFrames() {
	var idanimationFramesToLayers = stringIDToTypeID( "animationFramesToLayers" );
	var desc = new ActionDescriptor();
	executeAction(idanimationFramesToLayers, desc, DialogModes.NO);
}

/**
 * Delete animation
 */
function rpDeleteAnimation() {
	var idDlt = charIDToTypeID( "Dlt " );
	var desc = new ActionDescriptor();
	var idnull = charIDToTypeID( "null" );
	var ref = new ActionReference();
	var idanimationClass = stringIDToTypeID( "animationClass" );
	var idOrdn = charIDToTypeID( "Ordn" );
	var idTrgt = charIDToTypeID( "Trgt" );
	ref.putEnumerated( idanimationClass, idOrdn, idTrgt );
	desc.putReference( idnull, ref );
	executeAction( idDlt, desc, DialogModes.NO );
}

if (activeDocument) {
	var doc = activeDocument.duplicate();
	var docWidth = doc.width;
	var docHeight = doc.height;

	rpSelectFirstFrame();
	rpConvertAnimationToFrames();

	var animationLayers = [];

	// get animation layers
	for (var i = 0; i < doc.artLayers.length; i++) {
		// hide all other layers
		if (doc.artLayers[i].name.substr(0, 5) != 'Frame') {
			doc.artLayers[i].visible = false;
			continue;
		}

		animationLayers.push(doc.artLayers[i]);
	}

	if (animationLayers.length > 1) {
		rpDeleteAnimation();

		// resize the document
		doc.resizeCanvas(docWidth*animationLayers.length, docHeight, AnchorPosition.TOPRIGHT);

		for (var i = 0; i < animationLayers.length; i++) {
			animationLayers[i].translate(-i*docWidth, 0);
		}
	}
}
