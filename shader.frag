precision highp float;

// variables that I have access to
// gl_FragCoord

// variables that get set by my custom sketch
uniform vec2 u_resolution;
uniform vec3 custom_color;
uniform vec2 u_mouse;
uniform vec2 u_metaballPosition;
uniform float u_radius;

void main() {
	// normalize our inputs
	vec2 uv = gl_FragCoord.xy / u_resolution.xy;
	vec2 pos = u_metaballPosition * 2.0 + 0.5;
	float r = u_radius / u_resolution.x;
	
	// pick an interesting color
	float d = distance(uv, pos);
	//r *= 3.0;
	vec3 color = vec3(r / d);
	
	// set the color
	gl_FragColor = vec4(color, 1.0);
}