precision highp float;

// variables that I have access to
// gl_FragCoord

// constants that I define
const int numberOfBlobs = 3;	// this must match numberOfBlobs in the sketch

// variables that get set by my custom sketch
uniform vec2 u_resolution;
uniform vec3 custom_color;
uniform vec2 u_mouse;
uniform float u_metaballs[numberOfBlobs*3];

struct MetaBall {
	vec2 pos;
	float r;
};

vec2 mapObject(vec2 pos) {
	vec2 result = pos * 2.0 / u_resolution.xy;
	result.x += 1.0;
	result.y = 1.0 - result.y;
	return result;
}

void main() {
	// normalize our inputs
	vec2 uv = gl_FragCoord.xy * 2.0 / u_resolution.xy;
	
	MetaBall metaballs[numberOfBlobs];
	for (int i=0; i<numberOfBlobs; i++) {
		metaballs[i] = MetaBall(
			mapObject(vec2(u_metaballs[i*3], u_metaballs[i*3+1])), 
			u_metaballs[i*3+2] / u_resolution.x
		);
	}
	
	// pick an interesting color
	float d;
	vec3 color;
	for (int i=0; i<numberOfBlobs; i++) {
		d = distance(uv, metaballs[i].pos);
		color += vec3(metaballs[i].r / d);
	}
	
	// set the color
	gl_FragColor = vec4(color, 1.0);
}

