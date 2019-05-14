import * as THREE from 'three';
var glsl = require('glslify')

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
            fragmentShader: glsl.file("./shaders/fragment.glsl"),
            vertexShader: glsl.file("./shaders/vertex.glsl"),
            transparent: true,
            side: THREE.DoubleSide
        }))
    }



}

export { SphereShader as default }