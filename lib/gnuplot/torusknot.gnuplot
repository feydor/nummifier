set terminal pngcairo transparent enhanced font "arial,10" fontscale 1.0 size 700, 400 

unset key
unset tics
unset border

p=3; q=5
set parametric
set isosamples 15*p*q, 15
set hidden3d
set urange [0:2*pi]
set vrange [0:2*pi]
set zrange [-1:1] 
r=1; s=0.5; t=0.3
circles=60
do for[i=1:10800/circles] {
  set view 25, i, 1, 1
  set output sprintf('knot-torus.%03.0f.png', i)
  splot (r+s*cos(q*u)+t*cos(v))*cos(p*u), \
  (r+s*cos(q*u)+t*cos(v))*sin(p*u), \
  s*sin(q*u)+t*sin(v) lt rgb "#403539"
}

