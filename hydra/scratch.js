osc(function(){return 10 * Math.sin(time * 0.1)}).out()

s0.initCam() // initialize a webcam in source buffer s0
src(s0).out() // render source buffer s0
src(s0).kaleid(4).out() // render the webcam to a kaleidoscope

osc(10)
  .rotate(0.5)
  .diff(osc(200))
  .out()

  a.show()
