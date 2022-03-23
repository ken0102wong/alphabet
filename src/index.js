import { Color,Scene, GridHelper, HemisphereLight, DirectionalLight, Mesh, BoxGeometry, CylinderGeometry, Object3D, PerspectiveCamera, WebGLRenderer, Shape,
    ReinhardToneMapping, DodecahedronGeometry,OctahedronGeometry,PCFSoftShadowMap, MeshPhongMaterial, SphereGeometry,sRGBEncoding,CameraHelper,
    Vector2, MeshPhysicalMaterial, ExtrudeGeometry, MeshStandardMaterial,ACESFilmicToneMapping,
    DirectionalLightHelper, PointLight, MeshBasicMaterial, AmbientLight, OrthographicCamera, Math as threeMath,
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
        this.prngA = new sfc32(tokenData.hash.substr(2, 32));
        // seed prngB with second half of tokenData.hash
        this.prngB = new sfc32(tokenData.hash.substr(34, 32));
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
                    var material = new MeshPhongMaterial({
                        transparent: 1,
                        opacity: 0.6,
                        alphaTest: 0,
                        color: new Color(this.getRgbColor(this.dataSet[j][i])),
                        specular: new Color("#483c3c"),
                        shininess: 100,
                    });

                    meshArray[i] = new Mesh(geometry, material);
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
        // this.group.position.x -= 5;

        for (var i = 0; i < list.length; i++) {
            new TWEEN.Tween(list[i].scale).to({ x: 1, y: 1, z: 1 }, 1000).easing(TWEEN.Easing.Back.Out).start();
        }

        this.addTransition();
    }

    genGeometry() {
        let random_sharp = Math.random() * 10 % 3 | 0;
        let random_size = Math.random() * 10 + 5 | 0;
        random_sharp = 1;
        random_size = 5;
        if (random_sharp == 0)
            return new SphereGeometry(random_size/2);
        else if (random_sharp == 1)
            return new BoxGeometry(random_size,random_size,random_size);
        else if (random_sharp == 2)
            return new OctahedronGeometry(3, 0);
        else if (random_sharp == 3)
            return new DodecahedronGeometry(3, 0);
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

        var encodedLetter2 = {
            "A": "1FFBEBBB06EFF",
            "B": "1FE1DD87761FF",
            "C": "1FF1DDBF771FF",
            "D": "1FE1DDBB761FF",
            "E": "1FE0DF877E0FF",
            "F": "1FE0DF877EFFF",
            "G": "1FF0DFB3770FF",
            "H": "1FEEDD8376EFF",
            "I": "1FE0F7EFDE0FF",
            "J": "1FE0FBF76F1FF",
            "K": "1FE6CB8F2E6FF",
            "L": "1FF7EFDFBF1FF",
            "M": "1FEEC9AB56EFF",
            "N": "1FEECDAB66EFF",
            "O": "1FF1DDBB771FF",
            "P": "1FE1DD877EFFF",
            "Q": "1FE0DDAB6E2FF",
            "R": "1FE1DD876EEFF",
            "S": "1FF0DFC7F61FF",
            "T": "1FE0C1EFDFBFF",
            "U": "1FEEDDBB771FF",
            "V": "1FEEDDBBAFBFF",
            "W": "1FEED5AB575FF",
            "X": "1FEEEBEFAEEFF",
            "Y": "1FEEEBEFDFBFF",
            "Z": "1FE0DBEFB60FF",
            
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

        var brickColor = brick[Math.floor(r.random_dec() * brick.length)];
        var x = 0;
        for (var j = 0; j < this.dataSet.length; j++) {
            for (var i = 0; i < this.dataSet[j].length; i++){
                if (this.dataSet[j][i] != "0"){
                    this.dataSet[j][i] = "DM";         
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

            "A0": "#005e28",
            "A1": "#00565f",
            "A2": "#00466a",
            "A3": "#35477e",
            "A4": "#4f4482",
            "A5": "#b54788",
            "A6": "#fb5f5f",
        };
        return colorHash[colorType];
    }

    changeFormation1() {
        for (var i = 0; i < list.length; i++) {
            var rot = 360 / list.length * i;
            var vx = Math.random() * 100 -70;
            var vy = Math.random() * 100 - 50;
            var vz = Math.random() * 100 - 20;
            
            // new TWEEN.Tween(list[i].position).to({ x: vx, y: vy, z: vz }, 1000).easing(TWEEN.Easing.Exponential.Out).start();
            this.positions.push( vx, vy, vz );
            // new TWEEN.Tween(list[i].rotation).to({ x: 0, y: rot, z: 0 }, 1000).easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    //Cube
    changeFormation2() {
        var k = 0;
        for (var j = 0; j < this.dataSet.length; j++) {
            for (var i = 0; i < this.dataSet[j].length; i++) {
                var x = (i % this.NO_OF_NODE) * this.DOT_SIZE/1.5 + this.X_START_POS;
                var y = (this.NO_OF_NODE - Math.floor(i / this.NO_OF_NODE)) * this.DOT_SIZE/1.5 + this.Y_START_POS;

                if (this.dataSet[j][i] != "0"){
                    var orgColor = new Color(this.getRgbColor(this.dataSet[j][i]));
                    new TWEEN.Tween(list[k].material.color).to({r:orgColor.r, g:orgColor.g, b:orgColor.b}, 2000).easing(TWEEN.Easing.Cubic.InOut).start();
                    
                    this.positions.push( x, y, 0 );
                    k++;
                }
            }
        }

        
    }

    changeFormation3() {
        for (var i = 0; i < list.length; i++) {
            this.positions.push( 
                Math.random() * 400 - list.length/2, 
                -10, 
                Math.random() * 400 - list.length/2
            );
        }
    }

    changeFormation4() {
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;

            // new TWEEN.Tween(list[i].position).to({ x: vx, y: vy, z: vz }, 1000).easing(TWEEN.Easing.Exponential.InOut).start();
            this.positions.push( 
                150 * Math.sin(rot * Math.PI / 180), 
                1 * i - 10, 
                150 * Math.cos(rot * Math.PI / 180)
            );
            new TWEEN.Tween(list[i].rotation).to({ x: 0, y: rot, z: 0 }, 1000).easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    changeFormation5() {
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;
            
            // new TWEEN.Tween(list[i].position).to({ x: vx, y: vy, z: vz }, 1000).easing(TWEEN.Easing.Exponential.InOut).start();
            this.positions.push( 
                i * Math.sin(rot * Math.PI / 180) / 5, 
                i, 
                i * Math.cos(rot * Math.PI / 180) / 5
            );
            new TWEEN.Tween(list[i].rotation).to({ x: 0, y: rot, z: 0 }, 1000).easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    changeFormation6() {
        let random_size = Math.random() * 10 + 5 | 0;
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;
            var newColor = new Color(this.getRgbColor(r.random_choice(["A0", "A1", "A2", "A3", "A4","A5", "A6"])));
            new TWEEN.Tween(list[i].material.color).to({r:newColor.r, g:newColor.g, b:newColor.b}, 1000).easing(TWEEN.Easing.Cubic.InOut).start();
            this.positions.push( 
                i * Math.sin(rot * Math.PI / 180) - 30, 
                i - 90, 
                i * Math.cos(rot * Math.PI / 180) - 20
            );
        }
    }

    changeFormation7() {
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;

            this.positions.push( 
                150 * Math.sin(rot * Math.PI / 180), 
                (i - 1) * 10, 
                150 * Math.cos(rot * Math.PI / 180)
            );
            new TWEEN.Tween(list[i].rotation).to({ x: 0, y: rot, z: 0 }, 1000).easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    changeFormation8() {
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;
            if (i < list.length / 2) {
                var vx = 50 * Math.cos(rot * Math.PI / 360);
                var vy = i * 5 - list.length;
                var vz = 50 * Math.sin(rot * Math.PI / 360);
            } else {
                var vx = 50 * Math.sin(rot * Math.PI / 180);
                var vy = (i - list.length / 2) * 5 - list.length;
                var vz = 50 * Math.cos(rot * Math.PI / 180);
            }

            this.positions.push( vx, vy, vz );
            new TWEEN.Tween(list[i].rotation).to({ x: 0, y: rot, z: rot }, 1000).easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    changeFormation9() {
        const radius = 30;

        for (var i = 0; i < list.length; i++) {
            const phi = Math.acos( - 1 + ( 2 * i ) / list.length );
            const theta = Math.sqrt( list.length * Math.PI ) * phi;

            this.positions.push(
                radius * Math.cos( theta ) * Math.sin( phi ),
                radius * Math.sin( theta ) * Math.sin( phi ),
                radius * Math.cos( phi )
            );
        }
    }

    changeFormation10() {
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
    }

    changeFormation11(){
        for (var i = 0; i < list.length; i++) {
            var vx = Math.random() * 100 - 70;
            var vy = Math.random() * 100 - 50;//this.positions.y; 
            var vz = this.positions.z; //Math.random() * 100 - 20;

            
            this.positions.push( vx, vy, vz );

            var newColor = new Color(this.getRgbColor(r.random_choice(["MP", "LI", "PPB", "PA", "PS", "PP", "BT", "DM","CO"])));
            new TWEEN.Tween(list[i].material.color).to({r:newColor.r, g:newColor.g, b:newColor.b}, 3000).easing(TWEEN.Easing.Cubic.InOut).start();
            
        }
    }

    addTransition() {
        //this.changeFormation1();
        this.changeFormation2();
        //this.changeFormation4();
        //this.changeFormation6();
        //this.changeFormation7();
        // this.changeFormation8();
        // this.changeFormation9();
        // this.changeFormation10();
         this.changeFormation11();
    }

    transition() {
        const offset = this.current * list.length * 3;
        const duration = 2000;

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
        }

        // new TWEEN.Tween( this ).to( {}, duration * 3 ).start();
        this.current = ( this.current + 1 ) % 4;

    }

    deploy() {
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

    camera = new PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( -15, -10, 100 );
        
    renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);
    renderer.toneMapping = sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    const light = new DirectionalLight( 0xffffff, 5 );
    light.position.set( 120, 50, -100 );
    scene.add(light);

    const light2 = new DirectionalLight( 0xffffff, 5 );
    light2.position.set( -120, 50, 120 );
    scene.add(light2);

    scene.add(new AmbientLight(0xffffff, 0.5));

    alphabet = new Alphabet();
    scene.background = new Color("#0f0f0f");//alphabet.getRgbColor(r.random_choice([ "MP", "LI", "PPB", "PA", "PS", "PP", "BT", "DM","CO"])) );

    scene.add(alphabet.deploy());
    setInterval(changeID, 3500);

    render();
}

function changeID() {
    alphabet.transition();
}
var theta = 0;
var radius = 200;

function render() {
    renderer.setAnimationLoop(() => {
        // theta += 0.1;

        // camera.position.x = radius * Math.sin(threeMath.degToRad(theta));
        // camera.position.y = radius * Math.sin(threeMath.degToRad(theta));
        // camera.position.z = radius * Math.cos(threeMath.degToRad(theta));
        // camera.lookAt(scene.position);

        // camera.updateMatrixWorld();

        TWEEN.update();
        renderer.render(scene, camera);

        const time = performance.now();
        
        for ( let i = 0, l = list.length; i < l; i ++ ) {
            const object = list[ i ];
            const scale = Math.sin( ( Math.floor( object.position.x ) + time ) * 0.002 ) * 0.3 + 1;
            object.scale.set( scale, scale, scale );
        }
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
    data.tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();
    return data;
}
