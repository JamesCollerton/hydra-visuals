/*{ "audio": true }*/
precision mediump float;

/*
  UNIFORMS: Shared across all threads
*/

// Standard uniforms
uniform float time;
uniform vec2  resolution;

// Audio uniforms
uniform sampler2D texture;
uniform sampler2D spectrum;
uniform sampler2D samples;
uniform float volume;

/*
  FUNCTIONS
*/

// Plots a wave form sensitive to sound
void audioWave(vec2 uv) {
  vec4 color = texture2D(texture, uv);

  float freq = texture2D(spectrum, vec2(uv.x, .5)).r;
  float wave = texture2D(samples, vec2(uv.x, .5)).r;

  float r = 1. - step(0.01, abs(wave - uv.y));
  // float g = 1. - step(0.01, abs(freq - uv.y));
  // float b = 1. - step(0.01, abs(volume / 255. - uv.y));

  // Red, green, blue and alpha channels
  // gl_FragColor = vec4(r, g, b, 1.);
  gl_FragColor = vec4(r);
}

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

// void plotLine(uv) {
//
// }

void main (void) {
    // This normalises the frag coord by dividing it by the resolution, making the values
    // run from 0 to 1
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    audioWave(uv);

    // gl_FragColor = vec4(uv, 0.5 + 0.5 * sin(time), 1.0);
}
