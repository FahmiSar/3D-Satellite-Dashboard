import * as THREE from "three";

const WHITE = 0xffffff;


export function Light(scene){
    const ambientLight = new THREE.AmbientLight(WHITE, 0.56);
    ambientLight.castShadow = true;
    scene.add(ambientLight);
}

export function SpotLight(scene){
    const spotLight = new THREE.SpotLight(WHITE, 1);
    spotLight.castShadow = true;
    // This sets it slightly above and behind the camera
    // I'll refactor this later so we dont have magic numbers
    spotLight.position.set(0,64,32);
    scene.add(spotLight);
}