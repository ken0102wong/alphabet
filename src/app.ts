import { Color,Scene, GridHelper, TextureLoader, Mesh, BoxGeometry, MeshPhysicalMaterial, FrontSide } from 'https://cdn.skypack.dev/three@0.137';
import Character from './components/Character.js';
import PreProcessing from './components/PreProcessing.js';
import TWEEN from 'https://cdn.skypack.dev/@tweenjs/tween.js';
import { AsciiEffect } from 'https://cdn.skypack.dev/three-stdlib@2.8.5/effects/AsciiEffect';
import {changeFormation1, changeFormation2, changeFormation3, changeFormation4} from './components/Character.js';

const scene = new Scene();
const preProcessing = new PreProcessing(scene);
var ID = 1;
init();

function init(){    
    scene.background = new Color( 0xf0f0f0  );

    const helper = new GridHelper( 2000, 100 );
    helper.position.y = - 199;
   
    //scene.add( helper );

    new Character().deploy(scene);
    setInterval(changeID, 3000);
}

function changeID() {

    switch (ID) {
    case 1:
        changeFormation1();
        break;
    case 2:
        changeFormation2();
        break;
    case 3:
        changeFormation3();
        break;
    case 4:
        changeFormation4();
        break;
    default:
        changeFormation1();
        break;
    }

    ID++;
    if (ID > 4) {
        ID = 1;
    }
}




(async function() {
     preProcessing.getRenderer().setAnimationLoop(() => {
        TWEEN.update();
        // group_rot += 0.0001 * ROT_SPEED;
        // group.rotation.x = group_rot;
        // group.rotation.y = group_rot;
        // group.rotation.z = group_rot;
        //preProcessing.getEffectControl().render(scene, preProcessing.getCamera());
        preProcessing.getRenderer().render(scene, preProcessing.getCamera());
     });
 })();