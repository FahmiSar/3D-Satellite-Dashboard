import * as THREE from "three";

import {Light, SpotLight} from "./Subjects/Lights";
import * as Objects from "./Subjects/MeshObjects";

class SceneManager{

    // Constructor calls all the functions 
    constructor(canvas){
        this.canvas = canvas
        this.scene = this.buildScene();
        this.renderer = this.buildRenderer(this.canvas);
        this.camera = this.buildCamera();
        this.sceneSubjects = this.createSceneSubjects(this.scene);

        this.satellite = this.sceneSubjects.find(obj => obj.name == "satellite");
        this.setupRayCaster(); // Allows us to setup mouse clicks 
        this.setupMouseMoveListener(); // detects mouse hover

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

        const earth = new Objects.Earth(scene);
        const satellite = new Objects.satellite(scene, {x: 10, y: 10, z: 10});
        satellite.name = "satellite";

        const sceneSubjects = [
            new Light(scene),
            new SpotLight(scene),
            earth,
            satellite
        ]

        return sceneSubjects;
    }


    setupRayCaster(){
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        window.addEventListener("click", (event) => {
            // Mouse coordinates are 2D and measured using pixels but
            // Three.js doesnt use pixels for 3D objects so convert 2D mouse coords. to 
            // normalized 3D coords making the values go from [-1,1] with center being (0,0)
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // creates ray from camera and goes to the point the cursor is in 3D space
            this.raycaster.setFromCamera(this.mouse, this.camera);
            
            if(!this.satellite) return;

            // A comparison is made because now the mouse coordinates is in 3D and 
            const intersects = this.raycaster.intersectObject(this.satellite, true); 
            if(intersects.length > 0){ // intersectObject returns a list of all objects the ray interacted with
                window.location.href = "https://google.com"
            }

        });
    }


    // New function for mouse hover detection
    setupMouseMoveListener() {
        window.addEventListener("mousemove", (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);

            if (!this.satellite) return;

            const intersects = this.raycaster.intersectObject(this.satellite, true);

            // If the ray intersects with the satellite, change the cursor
            if (intersects.length > 0) {
                this.canvas.style.cursor = "pointer"; // Show hand cursor
            } else {
                this.canvas.style.cursor = "default"; // Default cursor when not over the satellite
            }
        });
    }

    // Update function is what App.jsx interacts with and it redraws 
    // everything added to the scene
    update(){
        this.renderer.render(this.scene,this.camera);
    }

}


export default SceneManager;