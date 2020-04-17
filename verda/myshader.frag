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

  float wave = texture2D(samples, vec2(uv.x, .5)).r;

  // float c = smoothstep(wave-0.02, wave, uv.y);

  float c = 1.0 - step(0.01, abs(wave - uv.y));

  gl_FragColor = vec4(c);
}

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void plotLine(vec2 uv) {

  float y = uv.x;

  vec3 color = vec3(y);

  // Plot a line
  float pct = plot(uv,y);
  color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

  gl_FragColor = vec4(color,1.0);

}

void timeSpectrum(vec2 uv) {

  float wave = texture2D(spectrum, vec2(uv.y, .5)).r;

  float c = 1. - step(0.01, abs(wave - uv.y));

  gl_FragColor = vec4(uv, wave * 10.0, 1.0);
}

void main (void) {
    // This normalises the frag coord by dividing it by the resolution, making the values
    // run from 0 to 1
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // audioWave(uv);
    // timeSpectrum(uv);
    plotLine(uv);

    // gl_FragColor = vec4(uv, 0.5 + 0.5 * sin(time), 1.0);
}
