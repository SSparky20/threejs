import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Enable shadows in the renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Add ambient light to the scene
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Add spotlight pointing down
const spotLight = new THREE.SpotLight(0xffffff, 10000); // Set the color and intensity of the light
spotLight.position.set(0, 150, -260); // Set the position of the light
spotLight.target.position.set(0, 0, -300); // Set the target for the spotlight
spotLight.angle = Math.PI / 5; // Decrease the angle of the spotlight
spotLight.penumbra = 0.1; // Soften the shadow edges
spotLight.castShadow = true; // Enable shadow casting
scene.add(spotLight);
scene.add(spotLight.target);

// // Add spotlight helper
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

// Create the cube 
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true; // Enable shadow casting for the cube
scene.add(cube);
cube.position.set(0, 1, 0);

// Creating the torus thingy
const torusGeometry = new THREE.TorusKnotGeometry(100, 10, 200, 20);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x7133ff });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.castShadow = true; // Enable shadow casting for the torus
scene.add(torus);
torus.position.set(0, 0, -300);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Function to handle window resize
function handleWindowResize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
}

// Event listener for window resize
window.addEventListener('resize', handleWindowResize);

// Animation function
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.001;

  controls.update();

  renderer.render(scene, camera);
}

// Initial call to handle the initial window size
handleWindowResize();

// Start the animation
animate();
