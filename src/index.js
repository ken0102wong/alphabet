import { Color,Scene, DirectionalLight, Mesh, BoxGeometry, Object3D, PerspectiveCamera, WebGLRenderer,
    Shape,ExtrudeBufferGeometry,MeshPhysicalMaterial, MeshPhongMaterial, SphereGeometry,sRGBEncoding,
    Vector3,DirectionalLightHelper, Math as threeMath, GridHelper, ReinhardToneMapping,
 } from 'https://cdn.skypack.dev/three@0.137';
import TWEEN from 'https://cdn.skypack.dev/@tweenjs/tween.js';

// global variable
let scene;
let camera;
let alphabet;

class Random {
    constructor() {
        this.useA = false;
        let sfc32 = function (uint128Hex) {
            let a = parseInt(uint128Hex.substr(0, 8), 16);
            let b = parseInt(uint128Hex.substr(8, 8), 16);
            let c = parseInt(uint128Hex.substr(16, 8), 16);
            let d = parseInt(uint128Hex.substr(24, 8), 16);
            return function () {
            a |= 0; b |= 0; c |= 0; d |= 0;
            let t = (((a + b) | 0) + d) | 0;
            d = (d + 1) | 0;
            a = b ^ (b >>> 9);
            b = (c + (c << 3)) | 0;
            c = (c << 21) | (c >>> 11);
            c = (c + t) | 0;
            return (t >>> 0) / 4294967296;
            };
        };
        // seed prngA with first half of tokenData.hash
        var hash = "0x80a6db47547e29cf8456f0f3b24c9efc8cda0fa3629b0192c67f5131b9e03698"; // tokenData.hash
        this.prngA = new sfc32(hash.substr(2, 32));
        // seed prngB with second half of tokenData.hash
        this.prngB = new sfc32(hash.substr(34, 32));
        for (let i = 0; i < 1e6; i += 2) {
            this.prngA();
            this.prngB();
        }
    }
    // random number between 0 (inclusive) and 1 (exclusive)
    random_dec() {
        this.useA = !this.useA;
        return this.useA ? this.prngA() : this.prngB();
    }
    // random number between a (inclusive) and b (exclusive)
    random_num(a, b) {
        return a + (b - a) * this.random_dec();
    }
    // random integer between a (inclusive) and b (inclusive)
    // requires a < b for proper probability distribution
    random_int(a, b) {
        return Math.floor(this.random_num(a, b + 1));
    }
    // random boolean with p as percent liklihood of true
    random_bool(p) {
        return this.random_dec() < p;
    }
    // random value in an array of items
    random_choice(list) {
        return list[this.random_int(0, list.length - 1)];
    }
  }

let renderer;
let list = [];
let tokenData = genTokenData(123);
let r = new Random();

class Alphabet{
    ID = 1;
    DOT_SIZE = 10;
    NO_OF_NODE = 7;

    X_START_POS = -(this.NO_OF_NODE / 2) * this.DOT_SIZE;
    Y_START_POS = -(this.NO_OF_NODE / 2) * this.DOT_SIZE;
    Z_START_POS = -4.5 * this.DOT_SIZE;

    group;
    dataSet;
    positions = [];
    current = 0;

    colorSet = [];
    cameraSet = [];
    orgColor = "";

    constructor(){
        this.group = new Object3D();
        var meshArray = [];
        this.dataSet = [];
        var geometry = this.genGeometry();
        this.genData();

        for (var j = 0; j < this.dataSet.length; j++) {

            for (var i = 0; i < this.dataSet[j].length; i++) {

                var x = (i % this.NO_OF_NODE) * this.DOT_SIZE/1.5 + this.X_START_POS;
                var y = (this.NO_OF_NODE - Math.floor(i / this.NO_OF_NODE)) * this.DOT_SIZE/1.5 + this.Y_START_POS;
                var z = j * this.DOT_SIZE/1.5 + this.Z_START_POS;

                if (this.dataSet[j][i] != "0"){

                    var material3 = new MeshPhysicalMaterial({
                        
                        color: new Color(this.getRgbColor(this.dataSet[j][i])),
                        emissive: new Color("#000000"),
                        metalness: 0.9,
                        roughness: 0.4,
                        reflectivity: 1,
                        clearcoat: 1.5,
                        clearcoatRoughness: 0.5,
                        
                    });

                    var material = new MeshPhongMaterial({
                        transparent: 1,
                        opacity: 0.7,
                        alphaTest: 0,
                        color: new Color(this.getRgbColor(this.dataSet[j][i])),
                        specular: new Color("#ffffff"),
                        emissive: new Color("#000000"),
                        shininess: 90,
                        reflectivity: 0.5,
                        refractionRatio: 0.5,
                    });
                    
                    meshArray[i] = new Mesh(geometry, material3);
                    meshArray[i].position.x = x;
                    meshArray[i].position.y = y;
                    meshArray[i].position.z = 0;
                    this.group.add(meshArray[i]);
                    list.push(meshArray[i]);
                }

            }
        }

        // laydown setting
        this.group.rotateX(5.4);
         this.group.rotateZ(-0.6);
         this.group.position.y -= 5;
         

        // front standing setting do nothing

        // standing with angle
        // this.group.rotateY(5.5);
         //this.group.position.x -= 5;

        for (var i = 0; i < list.length; i++) {
            new TWEEN.Tween(list[i].scale).to({ x: 1, y: 1, z: 1 }, 1000).easing(TWEEN.Easing.Back.Out).start();
        }

        this.addTransition();
    }

    createBoxWithRoundedEdges( width, height, depth, radius0, smoothness ) {
        let shape = new Shape();
        let eps = 0.00001;
        let radius = radius0 - eps;
        shape.absarc( eps, eps, eps, -Math.PI / 2, -Math.PI, true );
        shape.absarc( eps, height -  radius * 2, eps, Math.PI, Math.PI / 2, true );
        shape.absarc( width - radius * 2, height -  radius * 2, eps, Math.PI / 2, 0, true );
        shape.absarc( width - radius * 2, eps, eps, 0, -Math.PI / 2, true );
        let geometry = new ExtrudeBufferGeometry( shape, {
          depth: depth - radius0 * 2,
          bevelEnabled: true,
          bevelSegments: smoothness * 2,
          steps: 1,
          bevelSize: radius,
          bevelThickness: radius0,
          curveSegments: smoothness
        });
        
        geometry.center();
        
        return geometry;
      }

    genGeometry() {
        let random_sharp = Math.random() * 10 % 3 | 0;
        let random_size = Math.random() * 10 + 5 | 0;
        random_sharp = 2;
        random_size = 5;
        if (random_sharp == 0)
            return new SphereGeometry(random_size/2);
        else if (random_sharp == 1)
            return new BoxGeometry(random_size,random_size,random_size);
        else if (random_sharp == 2)
            return this.createBoxWithRoundedEdges(random_size, random_size, random_size, .85, 10);
    }

    hex2bin(hex){
        return (parseInt(hex, 16).toString(2)).padStart(49, '0');
    }

    getAlphabet(){

        var encodedLetter = {
            "A": "FBFE3C7FF1E3",
            "B": "1FB0E1FD870FE",
            "C": "FB0E0C1830BE",
            "D": "1F3161C38717C",
            "E": "1FF060F98307F",
            "F": "1FF060F183060",
            "G": "FB1E1C19F13E",
            "H": "1870E1FF870E1",
            "I": "F84081021F3E",
            "J": "FA284089121C",
            "K": "18B268E1A3262",
            "L": "183060C183F7E",
            "M": "1870F3DB870E1",
            "N": "1870F1D3971E1",
            "O": "FB0E1C3870BE",
            "P": "1FB0E1FD83060",
            "Q": "FB0E1C39713D",
            "R": "1FB0E1FDA3263",
            "S": "FA1C07C070BE",
            "T": "1FFFC9102041C",
            "U": "1870E1C38709E",
            "V": "18F1A24450A08",
            "W": "18F5AA54A9514",
            "X": "18D1141051163",
            "Y": "10D1961861860",
            "Z": "1FE18618618FF",
        }
        //var data =[Array.from(this.hex2bin(encodedLetter[r.random_choice(["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"])]))];
        var data =[Array.from(this.hex2bin(encodedLetter["Q"]))];
        var i = 0;
        for (i = 0; i < this.NO_OF_NODE; i++){
            data.push(data[0]);
        }

        return data;
    }

    genData() {
        var brick = []
        brick = [ "WH", "BG", "BR", "RD", "YL", "GN", "WT", "BL", "PR"];
        brick = [ "MP", "LI", "PPB", "PA", "PS", "PP", "BT", "DM","CO"];
        brick = [ "GG", "FF", "CL", "BA", "PR", "AT", "TC", "DT", "PO"];
        brick = ["A0", "A1", "A2", "A3", "A4", "A5", "A6"]

        this.dataSet =  this.getAlphabet();//new Array();
        this.orgColor = "WT";
        var brickColor = brick[Math.floor(r.random_dec() * brick.length)];
        var x = 0;
        for (var j = 0; j < this.dataSet.length; j++) {
            for (var i = 0; i < this.dataSet[j].length; i++){
                if (this.dataSet[j][i] != "0"){
                    this.dataSet[j][i] = "WT";         
                }
                
                if ((i+1) % 7 == 0)
                {
                    x++;
                    if (x>6)
                        x= 0;
                }
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
            "PO":"#077c19", // Poblano,

            "A0": "#0004ff",
            "A1": "#00ffcc",
            "A2": "#ff8800",
            "A3": "#ff0000",
            "A4": "#ff0084",
            "A5": "#b54788",
            "A6": "#fb5f5f",
        };
        return colorHash[colorType];
    }

    // core
    transit_core() {
        var k = 0;
        for (var j = 0; j < this.dataSet.length; j++) {
            for (var i = 0; i < this.dataSet[j].length; i++) {
                var x = (i % this.NO_OF_NODE) * this.DOT_SIZE/1.5 + this.X_START_POS;
                var y = (this.NO_OF_NODE - Math.floor(i / this.NO_OF_NODE)) * this.DOT_SIZE/1.5 + this.Y_START_POS;

                if (this.dataSet[j][i] != "0"){
                    this.positions.push( x, y, 0 );
                    k++;
                }
                   
                  
            }
        }

        this.cameraSet.push({ 
            rotation: new Vector3( 0, 0, 0 ),
            position: new Vector3( -15, -10, 100)
        });
    }

    // ring
    transit_ring() {
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;

            this.positions.push( 
                100 * Math.sin(rot * Math.PI / 180), 
                1 * i - 10, 
                100 * Math.cos(rot * Math.PI / 180)
            );
        }

        this.cameraSet.push({ 
            rotation: new Vector3( 0, threeMath.degToRad(-30), threeMath.degToRad(-30) ),
            // position: new Vector3( 0, 0, 100)
            position: new Vector3( -305, 0, 600)
        });
    }

    // twister
    transit_twister() {
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;
           
            this.positions.push( 
                i * Math.sin(rot * Math.PI / 180) - 30, 
                i * Math.cos(rot * Math.PI / 180), 
                i - 90
            );
        }

        this.cameraSet.push({ 
            rotation: new Vector3( threeMath.degToRad(-30), 0, threeMath.degToRad(0) ),
            position: new Vector3( -15, 50, 100)
        });
    }

    // twin snake
    transit_snake() {
        for (var i = 0; i < list.length; i++) {
            var rot = 15 * i;
            if (i < list.length / 2) {
                var vx = 25 * Math.cos(rot * Math.PI / 360);
                var vy = 25 * Math.sin(rot * Math.PI / 360);
                var vz = i * 2 - list.length/2;
            } else {
                var vx = 25 * Math.sin(rot * Math.PI / 180);
                var vy = 25 * Math.cos(rot * Math.PI / 180);
                var vz = (i - list.length / 2) * 2 - list.length/2;
            }
            this.positions.push( vx, vy, vz );
        }
        this.cameraSet.push({ 
            rotation: new Vector3( threeMath.degToRad(-40), 0, threeMath.degToRad(0) ),
            position: new Vector3( -5, 120, 120)
        });
    }

    // sphere
    transit_sphere() {
        const radius = 30;

        for (var i = 0; i < list.length; i++) {
            const phi = Math.acos( - 1 + ( 2 * i ) / list.length );
            const theta = Math.sqrt( list.length * Math.PI ) * phi;

            this.positions.push(
                radius * Math.cos( theta ) * Math.sin( phi ) - 10,
                radius * Math.sin( theta ) * Math.sin( phi ) - 15,
                radius * Math.cos( phi )
            );
        }

        this.cameraSet.push({ 
            rotation: new Vector3( 0, 0, 0 ),
            position: new Vector3( -15, -10, 100)
        });
    }

    // wave
    transit_wave() {
        const amountX = 16;
        const amountZ = 32;
        const separationPlane = 100;
        const offsetX = ( ( amountX - 1 ) * separationPlane ) / 2;
        const offsetZ = ( ( amountZ - 1 ) * separationPlane ) / 2;

        for ( let i = 0; i < list.length; i ++ ) {

            const x = ( i % amountX ) * separationPlane;
            const z = Math.floor( i / amountX ) * separationPlane + 20;
            const y = ( Math.sin( z * 0.5 ) + Math.sin( x * 0.5 ) ) * 200 + 100;

            this.positions.push( x - offsetX, y, z - offsetZ );
        }

        this.cameraSet.push({ 
            rotation: new Vector3( threeMath.degToRad(-30), 0, threeMath.degToRad(0) ),
            position: new Vector3( -15, -10, 100)
        });
    }

    transit_fragille(){
        for (var i = 0; i < list.length; i++) {
            this.positions.push( 
                Math.random() * 100 - 70, 
                Math.random() * 100 - 50, 
                Math.random() * 100 - 20
            );
        }

        this.cameraSet.push({ 
            rotation: new Vector3( 0, 0, 0 ),
            position: new Vector3( -15, -10, 100)
        });
    }

    addTransition() {
        this.transit_core();
        // this.transit_ring();
        this.transit_twister();
        // this.transit_snake();
        // this.transit_sphere();
        // this.transit_wave();
        // this.transit_fragille();
    }

    transition() {
        const offset = this.current * list.length * 3;
        const duration = 1500;

        for ( let i = 0, j = offset; i < list.length; i ++, j += 3 ) {
            const object = list[ i ];

            new TWEEN.Tween( object.position )
                .to( {
                    x: this.positions[ j ],
                    y: this.positions[ j + 1 ],
                    z: this.positions[ j + 2 ]
                }, Math.random() * duration + duration )
                .easing( TWEEN.Easing.Exponential.InOut )
                .start();
            
            var newColor = (this.current == 1 ? new Color(this.getRgbColor(r.random_choice(["MP", "LI", "PPB", "PA", "PS", "PP", "BT", "DM","CO"]))) : new Color(this.getRgbColor(this.orgColor)));
            new TWEEN.Tween(object.material.color).to({r:newColor.r, g:newColor.g, b:newColor.b}, 3000).easing(TWEEN.Easing.Cubic.InOut).start();
       
        }
        
        new TWEEN.Tween(camera).to(this.cameraSet[this.current], duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
        
        this.current = ( this.current + 1 ) % 2;
    }

    deploy() {
        return this.group;
    }
}

init();

function init(){

    var enableHelper = false;

    scene = new Scene();

    if (enableHelper){
        const ghelper = new GridHelper( 500, 50 );
        scene.add( ghelper );
        scene.add(new AxesHelper(50));    
    }
    
    camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( -15, -10, 100 );

    renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);
    
    renderer.outputEncoding = sRGBEncoding;
    renderer.toneMapping = ReinhardToneMapping;
    renderer.toneMappingExposure = 1;
    //renderer.physicallyCorrectLights = true;
    document.body.appendChild(renderer.domElement);


    // light 1
    const light = new DirectionalLight( 0xfcfbf5, 1 );
    light.position.set(-20, 20, 90 );
    light.target.position.set(-17,-2,-15);
    light.target.updateMatrixWorld();
    const helper = new DirectionalLightHelper(light, 5 );
    scene.add(light);
    scene.add(light.target);
    if (enableHelper) scene.add( helper );

     // light 2
     const light2 = new DirectionalLight( 0xfcfbf5, 1 );
     light2.position.set(-45, -15, 90 );
     light2.target.position.set(-22,-12,-10);
     light2.target.updateMatrixWorld();
     const helper2 = new DirectionalLightHelper(light2, 5 );
     scene.add(light2);
     scene.add(light2.target);
     if (enableHelper) scene.add( helper2 );

     // light 3
     const light3 = new DirectionalLight( 0xfcfbf5, 1 );
     light3.position.set(35, -15, 90 );
     light3.target.position.set(-4,-13,-55);
     light3.target.updateMatrixWorld();
     const helper3 = new DirectionalLightHelper(light3, 5 );
     scene.add(light3);
     scene.add(light3.target);
     if (enableHelper) scene.add( helper3 );
    
    

    alphabet = new Alphabet();
    //dbdbdb, 34373b
    scene.background = new Color("#dbdbdb");//alphabet.getRgbColor(r.random_choice([ "MP", "LI", "PPB", "PA", "PS", "PP", "BT", "DM","CO"])) );

    scene.add(alphabet.deploy());
    setInterval(changeID, 3000);

    render();
}

function changeID() {
    alphabet.transition();
}

function render() {
    renderer.setAnimationLoop(() => {
        
        renderer.render(scene, camera);

        const time = performance.now();
        
        for ( let i = 0, l = list.length; i < l; i ++ ) {
            const object = list[ i ];
            const scale = Math.sin( ( Math.floor( object.position.x ) + time ) * 0.002 ) * 0.3 + 1;
            object.scale.set( scale, scale, scale );
        }

        TWEEN.update();
    });
}

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

function genTokenData(projectNum) {
    let data = {};
    let hash = "0x";
    for (var i = 0; i < 64; i++) {
      hash += Math.floor(Math.random() * 16).toString(16);
    }
    data.hash = hash;
    console.log(hash);
    data.tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();
    return data;
}
