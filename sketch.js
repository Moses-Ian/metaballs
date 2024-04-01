let basicShader;

function preload() {
	basicShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  // put setup code here
	let canvas = createCanvas(300, 300, WEBGL);
	canvas.parent('sketch-container');
}

function draw() {
  // put drawing code here
	
	// define shader inputs like this
	basicShader.setUniform('u_resolution', [width, height]);
	basicShader.setUniform('custom_color', [0.4, 0.02, 0.8]);
	basicShader.setUniform('u_mouse', [mouseX, mouseY]);
	
	background(51);
	rectMode(CENTER);
	shader(basicShader);
	rect(0, 0, width-10, height-10);
}