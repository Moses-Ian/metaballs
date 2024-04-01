precision highp float;

// variables that I have access to
// gl_FragCoord

// variables that get set by my custom sketch
uniform vec2 u_resolution;
uniform vec3 custom_color;
uniform vec2 u_mouse;

void main() {
	vec2 uv = gl_FragCoord.xy / u_resolution.xy;
	gl_FragColor = vec4(1.0-uv.x, 0.0, 1.0-uv.y, 1.0);
}