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

// // Create the cube 
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// scene.add(cube);

// Function to create a cube at a random position
function createRandomCube() {
    const cubeSize = 1;
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = Math.random() * 10 - 5; // Random x coordinate between -5 and 5
    cube.position.y = Math.random() * 10 - 5; // Random y coordinate between -5 and 5
    scene.add(cube);
    return cube; // Return the cube so we can track it
  }
  
  // Array to keep track of all cubes
  const cubes = [];
  
  // Event listener for the button click
  document.getElementById('makeCube').addEventListener('click', function() {
    const newCube = createRandomCube();
    cubes.push(newCube);
  });

  // Event listener for the "Remove Cube" button click
document.getElementById('removeCube').addEventListener('click', function() {
    const lastCube = cubes.pop(); // Remove the most recent cube from the array
    if (lastCube) {
      scene.remove(lastCube); // Remove the cube from the scene
    }
  });
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
  
    // Rotate each cube
    cubes.forEach(cube => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    });
  
    renderer.render(scene, camera);
  }

// Initial call to handle the initial window size
handleWindowResize();


// Start the animation
animate();
