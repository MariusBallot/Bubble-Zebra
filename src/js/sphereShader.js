import * as THREE from 'three';
import { Scene } from 'three';

class SphereShader {

    constructor() {
        this.mesh
        this.uniforms
    }

    createSphere() {
        this.uniforms = {
            colorB: { type: 'vec3', value: new THREE.Color(0xA9B3C0) },
            colorA: { type: 'vec3', value: new THREE.Color(0xF3E6D5) },
            resolution: { type: 'vec2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            t: { type: 'f', value: 0.0 },
            react: { type: 'f', value: 1.0 },

        }
        this.mesh = new THREE.Mesh(new THREE.SphereGeometry(1.1, 50, 50), new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: this.fragmentShader(),
            vertexShader: this.vertexShader(),
            transparent: true,
            side: THREE.DoubleSide
        }))
    }

    vertexShader() {
        return `
    varying vec3 vUv; 

    void main() {
      vUv = position; 

      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `
    }

    fragmentShader() {
        return `
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
  `
    }


}

export { SphereShader as default }