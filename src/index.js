import { Color,Scene, GridHelper, HemisphereLight, Mesh, BoxGeometry, CylinderGeometry, Object3D, PerspectiveCamera, WebGLRenderer, Shape,
    ReinhardToneMapping, PCFSoftShadowMap, MeshPhongMaterial, SphereGeometry } from 'https://cdn.skypack.dev/three@0.137';
import { OrbitControls } from 'https://cdn.skypack.dev/three-stdlib@2.8.5/controls/OrbitControls';
import TWEEN from 'https://cdn.skypack.dev/@tweenjs/tween.js';

// global variable
let scene;
let camera;
let magic_cube;

let renderer;
let list = [];

class Alphabet{
    ID = 1;
    DOT_SIZE = 20;
    X_START_POS = -8 * this.DOT_SIZE;
    Y_START_POS = -8 * this.DOT_SIZE;
    Z_START_POS = -4.5 * this.DOT_SIZE;

    NO_OF_NODE = 8;

    group;
    dataSet;
    
    constructor(){
        this.group = new Object3D();
        var meshArray = [];

        var geometry = this.genGeometry();
        this.genData();

        for (var j = 0; j < this.dataSet.length; j++) {
            for (var i = 0; i < this.dataSet[j].length; i++) {
                var x = (i % this.NO_OF_NODE) * this.DOT_SIZE + this.X_START_POS;
                var y = (this.NO_OF_NODE - Math.floor(i / this.NO_OF_NODE)) * this.DOT_SIZE + this.Y_START_POS;
                var z = j * this.DOT_SIZE + this.Z_START_POS;

                var material = new MeshPhongMaterial({
                    color: new Color(this.getRgbColor(this.dataSet[j][i])),
                    specular: new Color("#483c3c"),
                    shininess: 100
                });
                meshArray[i] = new Mesh(geometry, material);
                meshArray[i].position.x = x;
                meshArray[i].position.y = y;
                meshArray[i].position.z = z;
                this.group.add(meshArray[i]);
                list.push(meshArray[i]);
            }
        }

        for (var i = 0; i < list.length; i++) {
            new TWEEN.Tween(list[i].scale).to({
                x: 1,
                y: 1,
                z: 1
            }, 1000)
                .easing(TWEEN.Easing.Back.Out).start();
        }
    }

    genGeometry() {
        let random_sharp = Math.random() * 10 % 3 | 0;
        let random_size = Math.random() * 10 + 5 | 0;

        if (random_sharp == 0)
            return new SphereGeometry(random_size);
        else if (random_sharp == 1) 
            return new BoxGeometry(random_size,random_size,random_size);
        else if (random_sharp == 2)
            return new CylinderGeometry(5,5,5,5,6, false);
        else {
            const extrudeSettings2 = {
                steps: 200,
                depth: 0.2,
                bevelEnabled: true,
                bevelThickness: 0.1,
                bevelSize: 0.1,
                bevelOffset: 0.2,
                bevelSegments: 25
            };

            const pts2 = [], numPts = 5;

            for ( let i = 0; i < numPts * 2; i ++ ) {
                const l = i % 2 == 1 ? 0.5 : 0.25;
                const a = i / numPts * Math.PI;

                pts2.push( new Vector2( Math.cos( a ) * l, Math.sin( a ) * l ) ); 
            }

            const shape2 = new Shape( pts2 );

            return new ExtrudeGeometry( shape2, extrudeSettings2 );
        }
    }

    genData() {
        var brick = []
        brick = [ "WH", "BG", "BR", "RD", "YL", "GN", "WT", "BL", "PR"];
        brick = [ "MP", "LI", "PPB", "PA", "PS", "PP", "BT", "DM","CO"];
        brick = [ "GG", "FF", "CL", "BA", "PR", "AT", "TC", "DT", "PO"];

        this.dataSet = new Array();
        for (var j = 0; j < this.NO_OF_NODE; j++) {
            this.dataSet[j] = new Array();
            for (var i = 0; i < this.NO_OF_NODE * this.NO_OF_NODE; i++) {
                if (this.dataSet[j] == null)
                    this.dataSet[j] = brick[Math.floor(Math.random() * brick.length)];
                else
                    this.dataSet[j].push(brick[Math.floor(Math.random() * brick.length)]);
            }
        }

        return this.dataSet;
    }

    getRgbColor(colorType) {
        var colorHash = {
            "WH":"#FFFFFF", // white
            "BG":"#edcda6", // beige
            "BR":"#800000", // brown
            "RD":"#FF0000", // red
            "YL":"#FFFF00", // yellow
            "GN":"#00FF00", // green
            "WT":"#00FFFF", // water
            "BL":"#0000FF", // blue
            "PR":"#800080",  // purple

            // Light Multiple
            "MP":"#986DE8", // Matt Purple
            "LI":"#B2F477", // Lima
            "PPB":"#CCD6FF", // Pale Phthalo Blue
            "PA":"#FCFFAD", // Parchment
            "PS":"#bd69ea", // Purple Snail
            "PP":"#e3a6f4", // Petal Plush
            "BT":"#ffc77f", // Beige Topaz
            "DM":"#88f7f5", // Defense Matrix
            "CO":"#a194f7", // Cobalite

            // Dark Multiple
            "GG":"#e8cb12", // Gouda Gold
            "FF":"#ed099d", // Fanatic Fuchsia
            "CL":"#001d59", // Clarinet
            "BA":"#b111c6", // Barney
            "PR":"#1a0b7f", // Prunelle
            "AT":"#068960", // Absinthe Turquoise
            "TC":"#0f7c01", // Toy Camouflage
            "DT":"#025a5b", // Dark Turquoise
            "PO":"#077c19", // Poblano
        };
        return colorHash[colorType];
    }

    changeFormation1() {
        for (var i = 0; i < list.length; i++) {
            var rot = 360 / list.length * i;
            var vx = Math.random() * 600 - 300;
            var vy = Math.random() * 600 - 300;
            var vz = Math.random() * 600 - 300;

            new TWEEN.Tween(list[i].position).to({ x: vx, y: vy, z: vz }, 1000).easing(TWEEN.Easing.Exponential.InOut).start();
            new TWEEN.Tween(list[i].rotation).to({ x: 0, y: rot, z: 0 }, 1000).easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    //Cube
    changeFormation2() {
        var k = 0;
        for (var j = 0; j < this.dataSet.length; j++) {
            for (var i = 0; i < this.dataSet[j].length; i++) {
                var x = (i % this.NO_OF_NODE) * this.DOT_SIZE + this.X_START_POS;
                var y = (this.NO_OF_NODE - Math.floor(i / this.NO_OF_NODE)) * this.DOT_SIZE + this.Y_START_POS;
                var z = j * this.DOT_SIZE + this.Z_START_POS;

                new TWEEN.Tween(list[k].position).to({ x: x, y: y, z: z }, 1000).easing(TWEEN.Easing.Exponential.InOut).start();
                new TWEEN.Tween(list[k].rotation).to({ x: 0, y: 0, z: 0 }, 1000).easing(TWEEN.Easing.Cubic.InOut).start();
                k++;
            }
        }
    }

    changeFormation3() {
        for (var i = 0; i < list.length; i++) {
            var rot = 360 / list.length * i;
            var vx = Math.random() * 800 - 300;
            var vy = 0;
            var vz = Math.random() * 600; //- 300;

            new TWEEN.Tween(list[i].position).to({ x: vx, y: vy, z: vz }, 1000).easing(TWEEN.Easing.Exponential.InOut).start();
            new TWEEN.Tween(list[i].rotation).to({ x: 0, y: rot, z: 0 }, 1000).easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    changeFormation4() {
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;
            var vx = 150 * Math.sin(rot * Math.PI / 180);
            var vy = 1 * i - 400;
            var vz = 150 * Math.cos(rot * Math.PI / 180);

            new TWEEN.Tween(list[i].position).to({ x: vx, y: vy, z: vz }, 1000).easing(TWEEN.Easing.Exponential.InOut).start();
            new TWEEN.Tween(list[i].rotation).to({ x: 0, y: rot, z: 0 }, 1000).easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    changeFormation5() {
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;
            var vx = i * Math.sin(rot * Math.PI / 180) / 5;
            var vy = i;
            var vz = i * Math.cos(rot * Math.PI / 180) / 5;

            new TWEEN.Tween(list[i].position).to({ x: vx, y: vy, z: vz }, 1000).easing(TWEEN.Easing.Exponential.InOut).start();
            new TWEEN.Tween(list[i].rotation).to({ x: 0, y: rot, z: 0 }, 1000).easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    changeFormation6() {
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;
            var vx = i * Math.sin(rot * Math.PI / 180);
            var vy = i;
            var vz = i * Math.cos(rot * Math.PI / 180);

            new TWEEN.Tween(list[i].position).to({ x: vx, y: vy, z: vz }, 1000).easing(TWEEN.Easing.Exponential.InOut).start();
            new TWEEN.Tween(list[i].rotation).to({ x: 0, y: rot, z: 0 }, 1000).easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    changeFormation7() {
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;
            var vx = 150 * Math.sin(rot * Math.PI / 180);
            var vy = (i - 1) * 10;
            var vz = 150 * Math.cos(rot * Math.PI / 180);

            new TWEEN.Tween(list[i].position).to({ x: vx, y: vy, z: vz }, 1000).easing(TWEEN.Easing.Exponential.InOut).start();
            new TWEEN.Tween(list[i].rotation).to({ x: 0, y: rot, z: 0 }, 1000).easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }
    
    changeFormation8() {
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;
            if (i < list.length / 2) {
                var vx = 150 * Math.cos(rot * Math.PI / 360);
                var vy = i * 10;
                var vz = 150 * Math.sin(rot * Math.PI / 360);
            } else {
                var vx = 150 * Math.sin(rot * Math.PI / 180) - 10;
                var vy = (i - list.length / 2) * 10;
                var vz = 150 * Math.cos(rot * Math.PI / 180);
            }

            new TWEEN.Tween(list[i].position).to({ x: vx, y: vy, z: vz }, 1000).easing(TWEEN.Easing.Exponential.InOut).start();
            new TWEEN.Tween(list[i].rotation).to({ x: 0, y: rot, z: 0 }, 1000).easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    update() {
        switch (this.ID) {
            case 1:
                this.changeFormation1();
                break;
            case 2:
                this.changeFormation2();
                break;
            case 3:
                this.changeFormation3();
                break;
            case 4:
                this.changeFormation4();
                break;
            case 5:
                this.changeFormation5();
                break;
            case 6:
                this.changeFormation6();
                break;
            case 7:
                this.changeFormation7();
                break;
            default:
                this.changeFormation8();
        }
        
        this.ID++;
        if (this.ID > 8) {
            this.ID = 1;
        }
    }

    deploy()
    {
        return this.group;
    }
}

init();

function init(){
    scene = new Scene();
    scene.background = new Color( 0xf0f0f0  );

    // const helper = new GridHelper( 2000, 100 );
    // helper.position.y = - 199;
    // scene.add( helper );

    camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 0, 250, 1000 );
    
    renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);
    renderer.toneMapping = ReinhardToneMapping;
    renderer.setClearColor(0x000000);
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0,0,0);
    controls.dampingFactor = 0.05;
    controls.enableDamping = true;

    const light = new HemisphereLight( 0xffffff, 0xffffff, 8 );
    light.color.setHSL( 0.6, 1, 0.6 );
    light.groundColor.setHSL( 0.095, 1, 0.75 );
    light.position.set( 40, 40, 40 );
    scene.add(light);

    alphabet = new Alphabet();
    scene.add(alphabet.deploy());
    setInterval(changeID, 2000);
    
    render();
}

function changeID() {
    alphabet.update();
}

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

