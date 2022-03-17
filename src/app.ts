import { Color,Scene, GridHelper, TextureLoader, Mesh, BoxGeometry, MeshPhysicalMaterial, FrontSide } from 'https://cdn.skypack.dev/three@0.137';
import Character from './components/Character.js';
import PreProcessing from './components/PreProcessing.js';
const scene = new Scene();
const preProcessing = new PreProcessing(scene);

init();

function init(){    
    scene.background = new Color( 0xf0f0f0  );

    const helper = new GridHelper( 2000, 100 );
    helper.position.y = - 199;
   
    scene.add( helper );

    new Character().deploy(scene);

    const imgFolder = "../../assets/";

    const textures = {
        frame: new TextureLoader().load(imgFolder + "frame.png"),
    }

    const frame = new Mesh(
        new BoxGeometry(420, 460, 5),
        new MeshPhysicalMaterial({
            map: textures.frame,
            side: FrontSide,
        })
    );
    
    frame.position.set(0, 30, -100);
    //scene.add(frame);

}


(async function() {
     preProcessing.getRenderer().setAnimationLoop(() => {
        preProcessing.getRenderer().render(scene, preProcessing.getCamera());
     });
 })();