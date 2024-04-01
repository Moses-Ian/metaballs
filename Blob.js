class Blob {
	constructor(x, y, radius) {
		this.pos = createVector(x, y);
		this.r = radius;
		this.vel = p5.Vector.random2D();
	}

	update() {
		this.pos.add(this.vel);
	}
	
	show() {
		noFill();
		stroke(0);
		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
	}
}