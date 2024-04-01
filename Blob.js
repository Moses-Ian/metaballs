class Blob {
	constructor(x, y, radius) {
		this.pos = createVector(x, y);
		this.r = radius;
	}
	
	show() {
		noFill();
		stroke(0);
		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
	}
}