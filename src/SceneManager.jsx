import * as THREE from "three";

import {Light, SpotLight} from "./Subjects/Lights";
import * as Objects from "./Subjects/MeshObjects";

class SceneManager{

    constructor(canvas){
        this.canvas = canvas
        this.scene = this.buildScene();
        this.renderer = this.buildRenderer(this.canvas);
        this.camera = this.buildCamera();
        this.sceneSubjects = this.createSceneSubjects(this.scene);
    }

    buildScene(){
        const scene = new THREE.Scene();
        
        return scene;
    }

    buildRenderer(canvas){
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        return renderer;
    }

    buildCamera(){
        const aspectRatio = window.innerWidth / window.innerHeight;
        const fieldOfView = 50;
        const nearPlane = 1;
        const farPlane = 1000;

        const camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );
        camera.position.z = 70;

        return camera;
    }

    createSceneSubjects(scene){
        const axesHelper = new THREE.AxesHelper(10000000); // 10 is the length of the axes
        scene.add(axesHelper);
        const sceneSubjects = [
            new Light(scene),
            new SpotLight(scene),
            new Objects.Earth(scene),
            new Objects.satellite(scene, {x: 10, y: 10, z: 10})
        ]

        return sceneSubjects;
    }


    update(){
        this.renderer.render(this.scene,this.camera);
    }

}


export default SceneManager;