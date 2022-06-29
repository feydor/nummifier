set terminal pngcairo transparent enhanced font "arial,10" fontscale 1.0 size 700, 400 

unset key
unset border
unset tics

set dummy u, v

circles=60
rings=30

set parametric
set isosamples circles, rings
set hidden3d back offset 1 trianglepattern 3 undefined 1 altdiagonal bentover
set urange [ -pi : pi ] noreverse nowriteback
set vrange [ -pi : pi ] noreverse nowriteback

radius=0.5

do for [i=1:360/circles] {
  set view 25, i, 1, 1
  set output sprintf('d-torus.%03.0f.png', i)
  splot cos(u)+radius*cos(u)*cos(v),sin(u)+radius*sin(u)*cos(v),radius*sin(v) lt rgb "#f7f7f7"
}
