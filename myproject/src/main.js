import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene setup
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer setup
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(55);

renderer.render(scene, camera);

// Torus object
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(0, 10, 0);

scene.add(pointLight, ambientLight);

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const spaceTexture = new THREE.TextureLoader().load('./space.jpg')
scene.background = spaceTexture;

// Avatar

const rockeyTexture = new THREE.TextureLoader().load('./rockey.jpg')

const rockey = new THREE.Mesh(
  new THREE.BoxGeometry(5,5,5),
  new THREE.MeshBasicMaterial({map:rockeyTexture})
)
scene.add(rockey)
rockey.position.set(20, 0, 0);

const moonTexture = new THREE.TextureLoader().load('./moon.jpg')
const normalTexture = new THREE.TextureLoader().load('./normalmap.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalTexture:normalTexture
  })
)
scene.add(moon)

// Variables for smooth camera movement
const targetPosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);

// Handle window scroll
function moveCanvas() {
  const view = document.body.getBoundingClientRect().top;

  // Calculate target camera positions based on scroll
  targetPosition.z = view * -0.05 + 55; // Adjust the offset for a better effect
  targetPosition.x = view * -0.02;
  targetPosition.y = view * -0.05;
}

document.body.onscroll = moveCanvas;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Smoothly interpolate camera position
  camera.position.lerp(targetPosition, 0.1); // Adjust the lerp factor (0.1) for more or less smoothing

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  rockey.rotation.y += 0.01;
  moon.rotation.y += 0.005;

  controls.update();
  renderer.render(scene, camera);
}

animate();
