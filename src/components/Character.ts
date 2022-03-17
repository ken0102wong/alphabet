import { Scene, Object3D, BoxGeometry, MeshLambertMaterial, Mesh } from 'https://cdn.skypack.dev/three@0.137';


var DOT_SIZE = 20;
var X_START_POS = -8 * DOT_SIZE;
var Y_START_POS = -8 * DOT_SIZE;
var Z_START_POS = -4.5 * DOT_SIZE;

// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [
    [
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","RD",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","BK",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","BK","BK",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BR",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BR",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BR","BR",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BR","BR",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BR","BR",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK"
    ],
    [
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","RD",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","BK",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","BK","BK",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BR",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BR",
    "BK","BK","BK","BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BR","BR",
    "BK","BK","BK","BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BR","BR",
    "BK","BK","BK","BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BR","BR",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK"
    ],
    [
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","BK","BK","BK","BG","BK","BK",
    "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","BG","BG","BG",
    "BK","BK","BK","BK","BK","BR","BR","BR","BK","BK","BK","BK","BK","RD","RD","RD",
    "BK","BK","BK","BK","BR","BG","BK","BK","BK","BK","BK","BK","BK","RD","RD","RD",
    "BK","BK","BK","BK","BR","BG","BK","BK","BK","BK","BK","BR","RD","RD","RD","RD",
    "BK","BK","BK","BK","BR","BR","BK","BK","BK","BK","BR","BR","BR","BR","RD","BK",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","RD","RD","BK","BK",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BL","BL","RD","RD","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BL","RD","RD","RD","BK","BK","BR",
    "BK","BK","BK","BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BK","BK","BR",
    "BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    "BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    "BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK"
    ],
    [
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BK","BK",
    "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BK","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BK","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BK","BK",
    "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","BK","BK",
    "BK","BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","BL","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","BL","BK","BK","BR",
    "BK","BK","BK","BK","BK","BK","RD","RD","RD","BL","BL","BL","BL","BK","BK","BR",
    "BK","BK","BK","BK","BK","BL","RD","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    "BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    "BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    "BK","BK","BK","BK","BK","BK","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK"
    ],
    [
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BK","BK",
    "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BR","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BR","BG","BG","BK","BK","BK",
    "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BG","BK",
    "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","BK","BK",
    "BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BG","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","RD","BL","RD","RD","RD","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","RD","RD","BL","RD","RD","RD","BK","BK","BK","BR",
    "BK","BK","BK","BK","BK","BK","RD","RD","BL","BL","BL","BL","BL","BK","BK","BR",
    "BK","BK","BK","BK","BK","BL","RD","BL","BL","BL","BL","BL","YL","BK","BR","BR",
    "BK","BK","BK","BR","BK","BL","BL","BL","BL","BL","BL","BL","BL","BK","BR","BR",
    "BK","BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BL","BK","BR","BR",
    "BK","BR","BR","BR","BK","BK","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    "BK","BR","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK"
    ],
    [
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BK","BK",
    "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BR","BG","BK","BK","BK","BK",
    "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BR","BG","BG","BK","BK","BK",
    "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BG","BK",
    "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","BK","BK",
    "BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BG","BK","BK","BK",
    "BK","BK","BK","BK","BK","BL","RD","BL","RD","RD","RD","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BL","RD","RD","BL","RD","RD","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BL","RD","RD","BL","BL","BL","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BL","RD","BL","BL","BL","BL","BL","BK","BK","BK","BK",
    "BK","BK","BK","BR","BK","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK",
    "BK","BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK",
    "BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    "BK","BR","BK","BK","BL","BL","BL","BL","BK","BK","BK","BK","BK","BK","BK","BK"
    ],
    [
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BK","BK",
    "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BR","BG","BK","BK","BK","BK",
    "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BR","BG","BG","BK","BK","BK",
    "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BG","BK",
    "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","BK","BK",
    "BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BG","BK","BK","BK",
    "BK","BK","RD","RD","RD","RD","RD","BL","RD","RD","RD","BK","BK","BK","BK","BK",
    "BK","RD","RD","RD","RD","RD","RD","RD","BL","RD","RD","BK","BK","BK","BK","BK",
    "BG","BG","RD","RD","RD","RD","RD","RD","BL","BL","BL","BK","BK","BK","BK","BK",
    "BG","BG","BG","BK","BK","BK","RD","BL","BL","BL","BL","BL","BK","BK","BK","BK",
    "BK","BG","BK","BR","BK","BK","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK",
    "BK","BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK",
    "BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    "BK","BR","BK","BK","BL","BL","BL","BL","BK","BK","BK","BK","BK","BK","BK","BK"
    ],
    [
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BK","BK",
    "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BK","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BK","BK","BK","BK","BK","BK",
    "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BK","BK",
    "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","BK","BK",
    "BK","BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BK","BK","BK",
    "BK","BK","RD","RD","RD","RD","RD","BL","RD","RD","BK","BK","BK","BK","BK","BK",
    "BK","RD","RD","RD","RD","RD","RD","RD","BL","RD","BK","BK","BK","BK","BK","BK",
    "BG","BG","RD","RD","RD","RD","RD","RD","BL","BL","BK","BK","BK","BK","BK","BK",
    "BG","BG","BG","BK","BK","BK","RD","BL","BL","YL","BK","BK","BK","BK","BK","BK",
    "BK","BG","BK","BR","BK","BK","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    "BK","BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    "BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    "BK","BR","BK","BK","BL","BL","BL","BL","BK","BK","BK","BK","BK","BK","BK","BK"
    ],
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

class Character{
    group: Object3D;

    constructor(){
        this.group = new Object3D();
        var i, j;
        var x, y, z;
        var meshArray = [];
        var color;
        var geometry = new BoxGeometry(DOT_SIZE , DOT_SIZE , DOT_SIZE );

        //console.log(genData());
        //dataSet = genData();
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
                    
                }
            }
        }
    }

    deploy(scene: Scene)
    {
        scene.add(this.group);
    }
}

export default Character;