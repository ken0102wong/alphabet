import { Scene, Object3D, BoxGeometry, MeshLambertMaterial, Mesh, CylinderGeometry } from 'https://cdn.skypack.dev/three@0.137';
import TWEEN from 'https://cdn.skypack.dev/@tweenjs/tween.js';

var DOT_SIZE = 20;
var X_START_POS = -8 * DOT_SIZE;
var Y_START_POS = -8 * DOT_SIZE;
var Z_START_POS = -4.5 * DOT_SIZE;

var dataSet = [
    //Mario
    // [
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","RD",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BR",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BR",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BR","BR",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BR","BR",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BR","BR",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK"
    // ],
    // [
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","RD",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BR",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BR",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BR","BR",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BR","BR",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BR","BR",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK"
    // ],
    // [
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","BK","BK","BK","BG","BK","BK",
    // "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","BG","BG","BG",
    // "BK","BK","BK","BK","BK","BR","BR","BR","BK","BK","BK","BK","BK","RD","RD","RD",
    // "BK","BK","BK","BK","BR","BG","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD",
    // "BK","BK","BK","BK","BR","BG","BK","BK","BK","BK","BK","BR","RD","RD","RD","RD",
    // "BK","BK","BK","BK","BR","BR","BK","BK","BK","BK","BR","BR","BR","BR","RD","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BL","BL","RD","RD","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BL","RD","RD","RD","BK","BK","BR",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BK","BK","BR",
    // "BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    // "BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    // "BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK"
    // ],
    // [
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BK","BK",
    // "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BK","BK",
    // "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","BL","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","BL","BK","BK","BR",
    // "BK","BK","BK","BK","BK","BK","RD","RD","RD","BL","BL","BL","BL","BK","BK","BR",
    // "BK","BK","BK","BK","BK","BL","RD","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    // "BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    // "BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    // "BK","BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK"
    // ],
    // [
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BK","BK",
    // "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BR","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BR","BG","BG","BK","BK","BK",
    // "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BG","BK",
    // "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BG","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","RD","BL","RD","RD","RD","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","RD","RD","BL","RD","RD","RD","BK","BK","BK","BR",
    // "BK","BK","BK","BK","BK","BK","RD","RD","BL","BL","BL","BL","BL","BK","BK","BR",
    // "BK","BK","BK","BK","BK","BL","RD","BL","BL","BL","BL","BL","YL","BK","BR","BR",
    // "BK","BK","BK","BR","BK","BL","BL","BL","BL","BL","BL","BL","BL","BK","BR","BR",
    // "BK","BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BL","BK","BR","BR",
    // "BK","BR","BR","BR","BK","BK","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    // "BK","BR","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK"
    // ],
    // [
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BK","BK",
    // "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BR","BG","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BR","BG","BG","BK","BK","BK",
    // "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BG","BK",
    // "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BG","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BL","RD","BL","RD","RD","RD","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BL","RD","RD","BL","RD","RD","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BL","RD","RD","BL","BL","BL","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BL","RD","BL","BL","BL","BL","BL","BK","BK","BK","BK",
    // "BK","BK","BK","BR","BK","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK",
    // "BK","BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK",
    // "BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    // "BK","BR","BK","BK","BL","BL","BL","BL","BK","BK","BK","BK","BK","BK","BK","BK"
    // ],
    // [
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BK","BK",
    // "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BR","BG","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BR","BG","BG","BK","BK","BK",
    // "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BG","BK",
    // "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BG","BK","BK","BK",
    // "BK","BK","RD","RD","RD","RD","RD","BL","RD","RD","RD","BK","BK","BK","BK","BK",
    // "BK","RD","RD","RD","RD","RD","RD","RD","BL","RD","RD","BK","BK","BK","BK","BK",
    // "BG","BG","RD","RD","RD","RD","RD","RD","BL","BL","BL","BK","BK","BK","BK","BK",
    // "BG","BG","BG","BK","BK","BK","RD","BL","BL","BL","BL","BL","BK","BK","BK","BK",
    // "BK","BG","BK","BR","BK","BK","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK",
    // "BK","BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK",
    // "BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    // "BK","BR","BK","BK","BL","BL","BL","BL","BK","BK","BK","BK","BK","BK","BK","BK"
    // ],
    // [
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BK","BK",
    // "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BK","BK",
    // "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BK","BK","BK",
    // "BK","BK","RD","RD","RD","RD","RD","BL","RD","RD","BK","BK","BK","BK","BK","BK",
    // "BK","RD","RD","RD","RD","RD","RD","RD","BL","RD","BK","BK","BK","BK","BK","BK",
    // "BG","BG","RD","RD","RD","RD","RD","RD","BL","BL","BK","BK","BK","BK","BK","BK",
    // "BG","BG","BG","BK","BK","BK","RD","BL","BL","YL","BK","BK","BK","BK","BK","BK",
    // "BK","BG","BK","BR","BK","BK","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    // "BK","BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    // "BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    // "BK","BR","BK","BK","BL","BL","BL","BL","BK","BK","BK","BK","BK","BK","BK","BK"
    // ],
    // Diagnourse
    // [
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","GN","GN","GN","GN","GN","GN","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","GN","GN","BK","GN","GN","GN","GN","GN",
    // "BK","BK","BK","BK","BK","BK","BK","BK","GN","GN","GN","GN","GN","GN","GN","GN",
    // "BK","BK","BK","BK","BK","BK","BK","BK","GN","GN","GN","GN","GN","GN","GN","GN",
    // "BK","BK","BK","BK","BK","BK","BK","BK","GN","GN","GN","GN","GN","GN","GN","GN",
    // "GN","BK","BK","BK","BK","BK","BK","BK","GN","GN","GN","GN","BK","BK","BK","BK",
    // "BK","GN","BK","BK","BK","BK","BK","BK","GN","GN","GN","GN","GN","GN","GN","BK",
    // "BK","GN","BK","BK","BK","BK","BK","GN","GN","GN","GN","GN","BK","BK","BK","BK",
    // "BK","GN","GN","BK","BK","BK","BK","GN","GN","GN","GN","GN","GN","GN","BK","BK",
    // "BK","BK","GN","GN","BK","BK","GN","GN","GN","GN","GN","GN","BK","GN","BK","BK",
    // "BK","BK","GN","GN","GN","GN","GN","GN","GN","GN","GN","GN","BK","BK","BK","BK",
    // "BK","BK","BK","GN","GN","GN","GN","GN","GN","GN","GN","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","GN","GN","GN","GN","GN","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","GN","BK","BK","GN","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","GN","BK","BK","GN","GN","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","GN","GN","BK","BK","BK","BK","BK","BK","BK","BK"
    // ],
    // [
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    // ]
    
];
var ID = 1;
var list = [];

function genData()
{

    var brick = ["BK", "WH", "BK", "BR", "RD", "YL", "GN", "WT", "BL", "PR"];

    var dataset = new Array();
    var i, j;
    for (j = 0; j < 16; j++) {
        dataset[j] = new Array();
        for (i = 0; i < 256; i++) {
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

//Cube
export function changeFormation2() {
    var i, j, k;
    var x, y, z;
    k = 0;
    for (j = 0; j < dataSet.length; j++) {
        for (i = 0; i < dataSet[j].length; i++) {
            x = (i % 16) * DOT_SIZE + X_START_POS;
            y = (16 - Math.floor(i / 16)) * DOT_SIZE + Y_START_POS;
            z = j * DOT_SIZE + Z_START_POS;
            if (dataSet[j][i] != "BK") {
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
}

export function changeFormation1() {
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

export function changeFormation3() {
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

export function changeFormation4() {
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

class Character{
    group: Object3D;

    constructor(){
        this.group = new Object3D();
        var i, j;
        var x, y, z;
        var meshArray = [];
        var color;
        //var geometry = new BoxGeometry(DOT_SIZE * 0.8 , DOT_SIZE * 0.8 , DOT_SIZE * 0.8 );
        var geometry = new CylinderGeometry(5,5,5,5,6, false);
        //console.log(genData());
        dataSet = genData();
        for (j = 0; j < dataSet.length; j++) {
            for (i = 0; i < dataSet[j].length; i++) {
                x = (i % 16) * DOT_SIZE + X_START_POS;
                y = (16 - Math.floor(i / 16)) * DOT_SIZE + Y_START_POS;
                z = j * DOT_SIZE + Z_START_POS;
                color = getRgbColor(dataSet[j][i]);

                if (dataSet[j][i] != "BK") {
                    var material = new MeshLambertMaterial({
                        color: color
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

        var i;
        for (i = 0; i < list.length; i++) {
            new TWEEN.Tween(list[i].scale).to({
                x: 1,
                y: 1,
                z: 1
            }, 1000)
                .easing(TWEEN.Easing.Back.Out).start();
        }
    }

    deploy(scene: Scene)
    {
        scene.add(this.group);
    }
}

export default Character;