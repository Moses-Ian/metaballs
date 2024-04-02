const G = 5;
const softMaxSpeed = 5;

class Blob {
	constructor(x, y, radius) {
		this.pos = createVector(x, y);
		this.r = radius;
		this.vel = p5.Vector.random2D();
		this.mass = .001;
		this.acc = createVector(0, 0);
	}

	update() {
		this.vel.add(this.acc);
		this.softLimit();
		this.pos.add(this.vel);
		
		if (this.pos.x > width/2 || this.pos.x < -width/2)
			this.vel.x *= -1;
		if (this.pos.y > height/2 || this.pos.y < -height/2)
			this.vel.y *= -1;
		
		this.acc.set(0, 0);
	}
	
	attract(other) {
		let force = p5.Vector.sub(this.pos, other.pos);
		let distanceSq = constrain(force.magSq(), .01);
		let strength = G * (this.mass * other.mass);
		force.setMag(strength);
		other.applyForce(force);
	}
	
	applyForce(force) {
		let f = p5.Vector.div(force, this.mass);
		this.acc.add(f);
	}
	
	softLimit() {
		if (this.vel.mag() < softMaxSpeed)
			return;
		
		let force = this.vel.mag() * (softMaxSpeed - this.vel.mag()) * .01;
		let forceVector = this.vel.copy().setMag(force);
		this.vel.add(forceVector);
	}
	
	show() {
		noFill();
		stroke(0);
		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
	}
}