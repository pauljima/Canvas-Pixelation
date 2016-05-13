var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
	cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame,

	anim,

	pixelateCanvas = document.getElementById("pixelateCanvas"),
	pixelateCtx = pixelateCanvas.getContext("2d"),
	img = new Image(),

	blockSize = 1,
	shrinkFactor = 1 / blockSize,

	imgWidth,
	imgHeight,
	w,
	h,

	minBlock = 2,
	maxBlock = 15,
	blockCheck,
	blockSpeed = 0.25;

// Image setup
img.src = document.getElementById("vader").getAttribute("src");
// img.src = "darth-vader.jpg";

// Kill smoothing for blocky pixels
pixelateCtx.imageSmoothingEnabled = false;

img.addEventListener("load", init, false);

function init(evt) {

	imgWidth = evt.target.width,
	imgHeight = evt.target.height,
	w = imgWidth * shrinkFactor,
	h = imgHeight * shrinkFactor;

	pixelate();

	// Original image on the right
	// pixelateCtx.drawImage(evt.target, imgWidth, 0);
}

function pixelate() {

	// Direction check
	if (blockSize >= maxBlock) blockCheck = true;
	else if (blockSize <= minBlock) blockCheck = false;

	// Animate block size
	if (blockCheck) blockSize -= blockSpeed;
	else blockSize += blockSpeed;

	shrinkFactor = 1 / blockSize;

	w = imgWidth * shrinkFactor,
	h = imgHeight * shrinkFactor;

	/*
	 * Pixelate image
	 */
	// Scale the context down and draw shrunken-image to canvas
	pixelateCtx.drawImage(img, 0, 0, w, h);

	// Redraw whole canvas as back in, scaled up by same factor
	pixelateCtx.drawImage(
		pixelateCanvas, 0, 0, w, h,									// Draw shrunken image clip
						0, 0, w / shrinkFactor, h / shrinkFactor	// back at full size.
	);

	anim = requestAnimationFrame(pixelate);
}