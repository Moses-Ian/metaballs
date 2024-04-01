attribute vec3 aPosition;

void main() { 
	// we need to adjust the position of the shader to fit the canvas
	gl_Position = vec4(aPosition, 1.0);
	gl_Position.xy = gl_Position.xy * 2.0 - 1.0;
}