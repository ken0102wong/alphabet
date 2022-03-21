import { Color,Scene, GridHelper, TextureLoader, Mesh, BoxGeometry, MeshPhysicalMaterial, FrontSide } from 'https://cdn.skypack.dev/three@0.137';
import Character from './components/Character.js';
import PreProcessing from './components/PreProcessing.js';
import TWEEN from 'https://cdn.skypack.dev/@tweenjs/tween.js';
import { AsciiEffect } from 'https://cdn.skypack.dev/three-stdlib@2.8.5/effects/AsciiEffect';
import {changeFormation} from './components/Character.js';

const scene = new Scene();
const preProcessing = new PreProcessing(scene);
let renderer = preProcessing.getRenderer();
const camera = preProcessing.getCamera();
var ID = 1;
init();

enum Direction {
    Fragile,
    Box,
    Laid,
    Clone,
    Tornado
}

function init(){    
    scene.background = new Color( 0xf0f0f0  );

    const helper = new GridHelper( 2000, 100 );
    helper.position.y = - 199;
   
    scene.add( helper );

    new Character().deploy(scene);
    setInterval(changeID, 3000);
}

function changeID() {
    changeFormation(ID);
    
    ID++;
    if (ID > 4) {
        ID = 1;
    }
}

render();

function render() {
    renderer.setAnimationLoop(() => {
        TWEEN.update();
        renderer.render(scene, camera);
    });
}

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})
