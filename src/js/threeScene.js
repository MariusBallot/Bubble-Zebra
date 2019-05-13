import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import SphereShader from './sphereShader';
import AudioReactor from './audioReactor';
import FloatingCam from './floatingCam';

class ThreeScene {

    constructor() {
        this.camera
        this.scene
        this.renderer
        this.sphere
        this.bgColor = new THREE.Color(0xffffff)
        this.pointLight
        this.cubeTexture
        this.cubeTextureLoader
        this.cam0;
        this.orbitControls
        this.sphereShader
        this.audioReactor
        this.floatingCam

    }

    init() {
        this.audioReactor = new AudioReactor()
        this.cubeTextureLoader = new THREE.CubeTextureLoader()
        this.cubeTextureLoader.setPath('../assets/cubeMap/')

        this.cubeTexture = this.cubeTextureLoader.load([
            'px.png', 'nx.png',
            'py.png', 'ny.png',
            'pz.png', 'nz.png'
        ])
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 2)
        this.camera.lookAt(this.scene.position)
        this.floatingCam = new FloatingCam(this.camera)
        document.addEventListener('mousemove', this.floatingCam.moveCam, false);


        // this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.orbitControls.enabled = true;
        // this.orbitControls.maxDistance = 1500;
        // this.orbitControls.minDistance = 0;


        this.pointLight = new THREE.PointLight();
        this.pointLight.position.set(2, 2, 0)
        this.scene.add(this.pointLight)





        this.sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 50, 50), new THREE.MeshStandardMaterial({
            metalness: 0.5,
            color: 0xF0E68C,
            roughness: 0.2,
            envMap: this.cubeTexture
        }))

        let torus = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.02, 40, 100), new THREE.MeshStandardMaterial({
            envMap: this.cubeTexture,
            color: 0xffffff,
            metalness: 1,
            roughness: 0.2
        }))
        torus.rotateX(1.5)
        this.sphere.add(torus)

        this.sphereShader = new SphereShader();
        this.sphereShader.createSphere()
        this.sphere.add(this.sphereShader.mesh)

        this.scene.add(this.sphere)


        this.bind()
    }

    update() {
        this.renderer.render(this.scene, this.camera)
        this.sphere.rotateY(0.01)
        this.sphereShader.uniforms.t.value += 1
        if (this.audioReactor.fdata != undefined) {
            this.audioReactor.update()
            this.sphereShader.uniforms.react.value = this.audioReactor.fdata[5]
        }

        this.floatingCam.update()
        this.camera.lookAt(this.scene.position)

    }


    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix();
    }

    bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this)
        window.addEventListener('resize', this.resizeCanvas)

    }
}

export { ThreeScene as default }