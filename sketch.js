let metaballShader;
let blob;
let bufferCanvas;

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
	blob = new Blob(0, 0, 50);
}

function draw() {
  // put drawing code here
	//background(51);
	
	// define shader inputs like this
	metaballShader.setUniform('u_resolution', [width, height]);
	metaballShader.setUniform('u_metaballPosition', [blob.pos.x, blob.pos.y]);
	metaballShader.setUniform('u_radius', blob.r);
	
	// show the shader
	rectMode(CENTER);
	bufferCanvas.rect(0, 0, width, height);
	texture(bufferCanvas);
	rect(0, 0, width, height);

	// show the blob
	blob.show();

	
	
}