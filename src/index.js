import { Color,Scene, GridHelper, HemisphereLight, Mesh, BoxGeometry, CylinderGeometry, Object3D, PerspectiveCamera, WebGLRenderer, Shape,
    ReinhardToneMapping, PCFSoftShadowMap, MeshLambertMaterial, SphereGeometry } from 'https://cdn.skypack.dev/three@0.137';
import { OrbitControls } from 'https://cdn.skypack.dev/three-stdlib@2.8.5/controls/OrbitControls';
import TWEEN from 'https://cdn.skypack.dev/@tweenjs/tween.js';

// global variable
let scene;
let camera;
let magic_cube;

let renderer;
let list = [];

class Magic_Cube{
    ID = 1;
    DOT_SIZE = 20;
    X_START_POS = -8 * this.DOT_SIZE;
    Y_START_POS = -8 * this.DOT_SIZE;
    Z_START_POS = -4.5 * this.DOT_SIZE;

    group;
    dataSet;
    
    constructor(){
        this.group = new Object3D();
        var meshArray = [];

        var geometry = this.random_geometry();
        this.genData();

        for (var j = 0; j < this.dataSet.length; j++) {
            for (var i = 0; i < this.dataSet[j].length; i++) {
                var x = (i % 16) * this.DOT_SIZE + this.X_START_POS;
                var y = (16 - Math.floor(i / 16)) * this.DOT_SIZE + this.Y_START_POS;
                var z = j * this.DOT_SIZE + this.Z_START_POS;

                var material = new MeshLambertMaterial({
                    color: new Color(this.getRgbColor(this.dataSet[j][i]))
                });
                meshArray[i] = new Mesh(geometry, material);
                meshArray[i].position.x = x - 0;
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

    random_geometry() {
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

        var brick = [ "WH", "BG", "BR", "RD", "YL", "GN", "WT", "BL", "PR"];

        this.dataSet = new Array();
        for (var j = 0; j < 16; j++) {
            this.dataSet[j] = new Array();
            for (var i = 0; i < 256; i++) {
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
            "PR":"#800080"  // purple
        };
        return colorHash[colorType];
    }

    changeFormation1() {
        console.log("1");
        for (var i = 0; i < list.length; i++) {
            var rot = 360 / list.length * i;
            var vx = Math.random() * 600 - 300;
            var vy = Math.random() * 600 - 300;
            var vz = Math.random() * 600 - 300;

            new TWEEN.Tween(list[i].position).to({
                x: vx,
                y: vy,
                z: vz
            }, 1000)
                .easing(TWEEN.Easing.Exponential.InOut).start();

            new TWEEN.Tween(list[i].rotation).to({
                x: 0,
                y: rot,
                z: 0
            }, 1000)
                .easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    //Cube
    changeFormation2() {
        console.log("2");
        var k = 0;
        for (var j = 0; j < this.dataSet.length; j++) {
            for (var i = 0; i < this.dataSet[j].length; i++) {
                var x = (i % 16) * this.DOT_SIZE + this.X_START_POS;
                var y = (16 - Math.floor(i / 16)) * this.DOT_SIZE + this.Y_START_POS;
                var z = j * this.DOT_SIZE + this.Z_START_POS;

                new TWEEN.Tween(list[k].position).to({
                    x: x,
                    y: y,
                    z: z
                }, 1000)
                    .easing(TWEEN.Easing.Exponential.InOut).start();
        
                new TWEEN.Tween(list[k].rotation).to({
                    x: 0,
                    y: 0,
                    z: 0
                }, 1000)
                    .easing(TWEEN.Easing.Cubic.InOut).start();
                k++;
            }
        }
    }

    changeFormation3() {
        console.log("3");
        for (var i = 0; i < list.length; i++) {
            var rot = 360 / list.length * i;
            var vx = Math.random() * 800 - 300;
            var vy = 0;
            var vz = Math.random() * 600; //- 300;

            new TWEEN.Tween(list[i].position).to({
                x: vx,
                y: vy,
                z: vz
            }, 1000)
                .easing(TWEEN.Easing.Exponential.InOut).start();

            new TWEEN.Tween(list[i].rotation).to({
                x: 0,
                y: rot,
                z: 0
            }, 1000)
                .easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    changeFormation4() {
        console.log("4");
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;
            var vx = 150 * Math.sin(rot * Math.PI / 180);
            var vy = 1 * i - 400;
            var vz = 150 * Math.cos(rot * Math.PI / 180);

            new TWEEN.Tween(list[i].position).to({
                x: vx,
                y: vy,
                z: vz
            }, 1000)
                .easing(TWEEN.Easing.Exponential.InOut).start();

            new TWEEN.Tween(list[i].rotation).to({
                x: 0,
                y: rot,
                z: 0
            }, 1000)
                .easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    changeFormation5() {
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;
            var vx = i * Math.sin(rot * Math.PI / 180) / 5;
            var vy = i;
            var vz = i * Math.cos(rot * Math.PI / 180) / 5;

            new TWEEN.Tween(list[i].position).to({
                x: vx,
                y: vy,
                z: vz
            }, 1000)
                .easing(TWEEN.Easing.Exponential.InOut).start();

            new TWEEN.Tween(list[i].rotation).to({
                x: 0,
                y: rot,
                z: 0
            }, 1000)
                .easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    changeFormation6() {
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;
            var vx = i * Math.sin(rot * Math.PI / 180);
            var vy = i;
            var vz = i * Math.cos(rot * Math.PI / 180);

            new TWEEN.Tween(list[i].position).to({
                x: vx,
                y: vy,
                z: vz
            }, 1000)
                .easing(TWEEN.Easing.Exponential.InOut).start();

            new TWEEN.Tween(list[i].rotation).to({
                x: 0,
                y: rot,
                z: 0
            }, 1000)
                .easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    changeFormation7() {
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;
            var vx = i * Math.sin(rot * Math.PI / 180);
            var vy = i * i;
            var vz = i * Math.cos(rot * Math.PI / 180) / 8;

            new TWEEN.Tween(list[i].position).to({
                x: vx,
                y: vy,
                z: vz
            }, 1000)
                .easing(TWEEN.Easing.Exponential.InOut).start();

            new TWEEN.Tween(list[i].rotation).to({
                x: 0,
                y: rot,
                z: 0
            }, 1000)
                .easing(TWEEN.Easing.Cubic.InOut).start();
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
                this.changeFormation5();
                break;
            case 7:
                this.changeFormation5();
                break;
            default:
                this.changeFormation1();
        }
        
        this.ID++;
        if (this.ID > 2) {
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

    const helper = new GridHelper( 2000, 100 );
    helper.position.y = - 199;
    scene.add( helper );

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
    light.position.set( 0, 40, 0 );
    scene.add(light);

    magic_cube = new Magic_Cube();
    scene.add(magic_cube.deploy());
    setInterval(changeID, 1000);
    
    render();
}

function changeID() {
    magic_cube.update();
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

