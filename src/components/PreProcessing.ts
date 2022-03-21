import { PerspectiveCamera, Scene, WebGLRenderer,ReinhardToneMapping,PCFSoftShadowMap, EventDispatcher, HemisphereLight } from 'https://cdn.skypack.dev/three@0.137';
import { OrbitControls } from 'https://cdn.skypack.dev/three-stdlib@2.8.5/controls/OrbitControls';
import Light from './Light.js';
import { AsciiEffect } from 'https://cdn.skypack.dev/three-stdlib@2.8.5/effects/AsciiEffect';

class PreProcessing {

    private camera : PerspectiveCamera;
    private renderer : WebGLRenderer;
    private controls : any;
    private effect: any;

    public getCamera(): PerspectiveCamera{
        return this.camera;
    }

    public getRenderer(): WebGLRenderer{
        return this.renderer;
    }

    public getOrbitControls(): any{
        return this.controls;
    }

    public getEffectControl() {
        return this.effect;
    }


    
    constructor(scene: Scene) {
        // setup the main camera of the world

        this.camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.set( 0, 250, 1000 );
       
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(innerWidth, innerHeight);
        this.renderer.toneMapping = ReinhardToneMapping;
        this.renderer.setClearColor(0x000000);
        this.renderer.physicallyCorrectLights = true;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
        // this.effect = new AsciiEffect( this.renderer, ' -+@#|/', { invert: false } );
        // this.effect.setSize( innerWidth, innerHeight );
        // this.effect.domElement.style.color = 'white';
        // this.effect.domElement.style.backgroundColor = 'black';

        //document.body.appendChild(this.effect.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0,0,0);
        this.controls.dampingFactor = 0.05;
        this.controls.enableDamping = true;

        new Light.AmbLight().deploy(scene);
        new Light.SptLight().deploy(scene);
        new Light.Light().deploy(scene, false);
    }

    
}

export default PreProcessing;