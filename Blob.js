class Blob {
	constructor(x, y, radius) {
		this.pos = createVector(x, y);
		this.r = radius;
		this.vel = p5.Vector.random2D();
	}

	update() {
		this.pos.add(this.vel);
		
		if (this.pos.x > width/2 || this.pos.x < -width/2)
			this.vel.x *= -1;
		if (this.pos.y > height/2 || this.pos.y < -height/2)
			this.vel.y *= -1;
	}
	
	show() {
		noFill();
		stroke(0);
		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
	}
}