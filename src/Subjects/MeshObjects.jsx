import * as THREE from "three";

// Sizing Constants
const cubeSize = {
	width: 16,
	height: 16,
	depth: 16,
};

// Object creation - Mesh + Texture
export function Cube(scene) {
	const geometry = new THREE.BoxGeometry(
		cubeSize.width,
		cubeSize.height,
		cubeSize.depth
	);
	const material = new THREE.MeshNormalMaterial();
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
}
