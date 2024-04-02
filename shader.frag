precision highp float;

// variables that I have access to
// gl_FragCoord

// constants that I define
const int numberOfBlobs = 15;	// this must match numberOfBlobs in the sketch

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

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
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
	float hue;
	for (int i=0; i<numberOfBlobs; i++) {
		d = distance(uv, metaballs[i].pos);
		hue += metaballs[i].r / d;
	}
	hue = min(hue, 1.0);
	color = hsv2rgb(vec3(hue, 1.0, 1.0));
	
	// set the color
	gl_FragColor = vec4(color, 1.0);
}

