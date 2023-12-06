import * as THREE from 'three';

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// const ringGeometry = new THREE.RingGeometry(10, 50, 20, 5, 0, Math.PI * 2 );
// const ringMaterial = new THREE.MeshBasicMaterial({color: 0xFFFF00})
// const ring = new THREE.Mesh(ringGeometry, ringMaterial)
// scene.add(ring);
// ring.position.set(0, 0, -90);

const knotGeometry = new THREE.TorusKnotGeometry(50, 10, 50, 20)
const knotMaterial = new THREE.MeshBasicMaterial({color: 0xAAAAAA})
const knot = new THREE.Mesh(knotGeometry, knotMaterial)
scene.add(knot)
knot.position.set(0, 0, -150);

// Function to handle window resize
function handleWindowResize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  // Update camera aspect ratio
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(newWidth, newHeight);
}

// Event listener for window resize
window.addEventListener('resize', handleWindowResize);

// Animation function
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  knot.rotation.x += 0.02;
  knot.rotation.y += 0.02;

  renderer.render(scene, camera);
}

// Initial call to handle the initial window size
handleWindowResize();

// Start the animation
animate();
