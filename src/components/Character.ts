import { Scene, Object3D, BoxGeometry, MeshLambertMaterial, Mesh, CylinderGeometry, SphereGeometry, ExtrudeGeometry, Shape, Vector2 } from 'https://cdn.skypack.dev/three@0.137';
import TWEEN from 'https://cdn.skypack.dev/@tweenjs/tween.js';

var DOT_SIZE = 20;
var X_START_POS = -8 * DOT_SIZE;
var Y_START_POS = -8 * DOT_SIZE;
var Z_START_POS = -4.5 * DOT_SIZE;

var dataSet = [];
var ID = 1;
var list = [];

function genData()
{

    var brick = [ "WH", "BR", "RD", "YL", "GN", "WT", "BL", "PR"];

    var dataset = new Array();
    for (var j = 0; j < 16; j++) {
        dataset[j] = new Array();
        for (var i = 0; i < 256; i++) {
            if (dataset[j] == null)
                dataset[j] = brick[Math.floor(Math.random() * 10)];
            else
                dataset[j].push(brick[Math.floor(Math.random() * 10)]);
        }
    }

    return dataset;
}


function getRgbColor(colorType)
{
    var colorHash = {
        "BK":"#000000", // black
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

export function changeFormation(ID: number) {
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
        case 5:
            changeFormation5();
            break;
        default:
            changeFormation1();
    }
}

//Cube
function changeFormation2() {
    var k = 0;
    for (var j = 0; j < dataSet.length; j++) {
        for (var i = 0; i < dataSet[j].length; i++) {
            var x = (i % 16) * DOT_SIZE + X_START_POS;
            var y = (16 - Math.floor(i / 16)) * DOT_SIZE + Y_START_POS;
            var z = j * DOT_SIZE + Z_START_POS;

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

function changeFormation1() {
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

function changeFormation3() {
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

function changeFormation4() {
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

function changeFormation5() {
    var i, j, k;
    var x, y, z;
    k = 0;
    for (j = 0; j < dataSet.length; j++) {
        for (i = 0; i < dataSet[j].length; i++) {
            x = (i % 16) * DOT_SIZE + X_START_POS;
            y = (16 - Math.floor(i / 16)) * DOT_SIZE + Y_START_POS;
            z = j * DOT_SIZE + Z_START_POS;
            
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

class Character{
    group: Object3D;

    constructor(){
        this.group = new Object3D();
        var meshArray = [];

        var geometry = this.random_geometry();
        //console.log(genData());
        dataSet = genData();
        for (var j = 0; j < dataSet.length; j++) {
            for (var i = 0; i < dataSet[j].length; i++) {
                var x = (i % 16) * DOT_SIZE + X_START_POS;
                var y = (16 - Math.floor(i / 16)) * DOT_SIZE + Y_START_POS;
                var z = j * DOT_SIZE + Z_START_POS;

                if (dataSet[j][i] != "BK") {
                    var material = new MeshLambertMaterial({
                        color: getRgbColor(dataSet[j][i])
                    });
                    meshArray[i] = new Mesh(geometry, material);
                    meshArray[i].position.x = x - 0;
                    meshArray[i].position.y = y;
                    meshArray[i].position.z = z;
                    this.group.add(meshArray[i]);
                    list.push(meshArray[i]);
                }
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

    deploy(scene: Scene)
    {
        scene.add(this.group);
    }
}

export default Character;