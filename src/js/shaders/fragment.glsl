      uniform vec3 colorA; 
      uniform vec3 colorB; 
      uniform vec2 resolution;
      uniform float t;
      uniform float react;

      varying vec3 vUv;
      

    float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

      void main() {
        vec2 st = gl_FragCoord.xy/resolution.xy;
        st*=react/40.+1.;
        vec2 pos = vec2(st*5.0*vUv.z*vUv.x);

        
        float n = noise(pos);
      float nbis = n;

        if(n>0.5){
            n = 1.0;
        }else{
            n=0.0;
        }       

        gl_FragColor = vec4(mix(colorA*(1.-react/256.), colorB, nbis*2.),n);

      }