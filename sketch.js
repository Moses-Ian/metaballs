let metaballShader;
let blobs;
let bufferCanvas;
const numberOfBlobs = 10;	// this must match numberOfBlobs in the shader

function preload() {
	metaballShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  // put setup code here
	let canvas = createCanvas(300, 300, WEBGL);
	canvas.parent('sketch-container');
	
	// create a buffer canvas for the layers
	bufferCanvas = createGraphics(300, 300, WEBGL);
	bufferCanvas.shader(metaballShader);

	// create the blob
	blobs = [];
	for (let i=0; i<numberOfBlobs; i++) {
		let x = random(-width/2, width/2);
		let y = random(-height/2, height/2);
		blobs.push(new Blob(x, y, 10));
	}
	console.log(blobs);
}

function draw() {
  // put drawing code here
	//background(51);
	
	// update the scene
	blobs.forEach(blob => blob.update());
	
	// define shader inputs like this
	metaballShader.setUniform('u_resolution', [width, height]);
	metaballShader.setUniform('u_metaballs', createMetaballArray());
	
	// show the shader
	rectMode(CENTER);
	bufferCanvas.rect(0, 0, width, height);
	texture(bufferCanvas);
	rect(0, 0, width, height);

	// show the blobs
	//blobs.forEach(blob => blob.show());

	//noLoop();
	
}

function createMetaballArray() {
	let arr = [];
	blobs.forEach(blob => arr.push(blob.pos.x, blob.pos.y, blob.r));
	return arr;
}