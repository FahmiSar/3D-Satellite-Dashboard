import { useEffect } from "react";
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

function App() {
	useEffect(() => {
		const scene = new THREE.Scene();

		// Camera
		const camera = new THREE.PerspectiveCamera(
			50,
			window.innerWidth / window.innerHeight,
			1,
			1000
		);
		camera.position.z = 96;

		// Renderer
		const canvas = document.getElementById("canvas");
		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		// Lighting - to add visibility to things added to the canvas
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		ambientLight.castShadow = true;
		scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0,64,32);
    scene.add(spotLight);

    // Geometry - objects
    const boxGeometry = new THREE.BoxGeometry(16,16,16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Animations - This function will run every frame
    const animate = () => {
      controls.update()
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

	}, []);

	return (
		<div>
			{/**Everything in Three.js binds to a canvas */}
			<canvas id="canvas" />
		</div>
	);
}

export default App;
