import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";


class SceneInit{
    constructor(canvasId){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
			50,
			window.innerWidth / window.innerHeight,
			1,
			1000
        );
        camera.position.z = 96;
    }



}


export default SceneInit;