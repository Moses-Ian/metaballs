let metaballShader;
let blobs;
let bufferCanvas;
const numberOfBlobs = 15;	// this must match numberOfBlobs in the shader

let maxSpeed;


function preload() {
	metaballShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  // put setup code here
	let canvas = createCanvas(500, 500, WEBGL);
	canvas.parent('sketch-container');
	
	// create a buffer canvas for the layers
	bufferCanvas = createGraphics(500, 500, WEBGL);
	bufferCanvas.shader(metaballShader);

	// create the blob
	blobs = [];
	for (let i=0; i<numberOfBlobs; i++) {
		let x = random(-width/2, width/2);
		let y = random(-height/2, height/2);
		blobs.push(new Blob(x, y, 12));
	}
	console.log(blobs);
	
	// max speed
	maxSpeed = 0;
}

function draw() {
	// update the scene
	for (let i=0; i<numberOfBlobs; i++) {
		for (let j=0; j<numberOfBlobs; j++) {
			if (i == j)
				continue;
			blobs[i].attract(blobs[j]);
		}
	}
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
	
	// log how fast the fastest blob is
	// blobs.forEach(blob => {
		// if (blob.vel.mag() > maxSpeed)
			// maxSpeed = blob.vel.mag();
	// });
	// console.log(maxSpeed);
}

function createMetaballArray() {
	let arr = [];
	blobs.forEach(blob => arr.push(blob.pos.x, blob.pos.y, blob.r));
	return arr;
}