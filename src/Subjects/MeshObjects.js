import * as THREE from "three";

// Sizing Constants
// Longitude refers to the width segements
// Latitude refers to the height segments
const earthSize = {
	radius: 15,
	longitude: 32,
	latitude: 16
};

const satelliteSize = {
	width: 1,
	height: 1,
	depth: 0.75
}

const panelSize = {
	width: 0.7,
	height: 1.5,
	depth: 0.125
}


// Color Constants
const GRAY = 0xaaaaaa;
const BLUE = 0x1a2d5e;
const YELLOW = 0xb68941;

export function Earth(scene){
	// Create shape of Earth
	const geometry = new THREE.SphereGeometry(
		earthSize.radius,
		earthSize.longitude,
		earthSize.latitude
	);
	
	// Map the NASA blue marble jpeg to be used on geometry
	const textureLoader = new THREE.TextureLoader();
	const material = new THREE.MeshStandardMaterial({
		map: textureLoader.load("/NASA Blue Marble.jpg")
	});

	// Create finished model (mesh)
	const mesh = new THREE.Mesh(geometry, material);

	// The Tilt of the Earth
	mesh.rotation.x = THREE.MathUtils.degToRad(23.5);

	// Set the Earth in the Center of page/scene
	mesh.position.set(0,0,0);

	scene.add(mesh);
};


export function satellite(scene, position){
	
	const satellite = new THREE.Group();

	// Body of Satellite
	const bodyGeometry = new THREE.BoxGeometry(
		satelliteSize.width,
		satelliteSize.height,
		satelliteSize.depth
	);
	const bodyMaterial = new THREE.MeshStandardMaterial({
		color: YELLOW
	});

	const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
	satellite.add(body);

	// Panels of Satellite
	const panelGeometry = new THREE.BoxGeometry(
		panelSize.width,
		panelSize.height,
		panelSize.depth
	);
	const panelMaterial = new THREE.MeshStandardMaterial({
		color: BLUE
	});

	// Create satilites and position them relatively
	const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
	leftPanel.rotation.z = Math.PI / 2; // puts panel horizontal
	leftPanel.position.set(
		-0.75,
		0,
		0
	);
	satellite.add(leftPanel);

	const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);
	rightPanel.rotation.z = Math.PI / 2; // puts panel horizontal
	rightPanel.position.set(
		0.75,
		0,
		0
	);
	satellite.add(rightPanel);


	// Position the entire Satellite
	satellite.position.set(
		position.x,
		position.y,
		position.z
	);
	scene.add(satellite);

};