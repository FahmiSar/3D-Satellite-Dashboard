import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import SceneManager from "./SceneManager";

function App() {
	useEffect(() => {
		const canvas = document.getElementById("canvas");
		const sceneManager = new SceneManager(canvas);

		const controls = new OrbitControls(
			sceneManager.camera, 
			sceneManager.renderer.domElement
		);

		// this defines our animation loop
		const animate = () => {
			requestAnimationFrame(animate)
			controls.update()
			sceneManager.update()
		};

		// call it once to keep the loop
		animate();
	}, []);

	return (
		<>
			{/**Everything in Three.js binds to a canvas */}
			<canvas id="canvas"></canvas>
		</>
	);
}

export default App;
