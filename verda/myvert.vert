/*{ "vertexCount": 100 }*/

precision mediump float;

uniform sampler2D texture;
uniform sampler2D spectrum;
uniform sampler2D samples;
uniform float volume;

attribute float vertexId;
uniform float vertexCount;
uniform float time;
uniform vec2 resolution;

varying vec4 v_color;

void main() {
  float i = vertexId * time * 0.005;


  vec3 pos = vec3(
    cos(i),
    sin(i),
    cos(i)
  );

  gl_Position = vec4(pos.x, pos.y, pos.z, 1);

  v_color = vec4(fract(vertexId / 3.), 1, 1, 1);
}
