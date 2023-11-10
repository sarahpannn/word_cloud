import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let group, camera, scene, renderer;

init();
animate();

function init() {


    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // camera

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(15, 20, 30);
    scene.add(camera);

    // controls

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    // ambient light

    scene.add(new THREE.AmbientLight(0x666666));

    // point light

    const light = new THREE.PointLight(0xffffff, 3, 0, 0);
    camera.add(light);

    // helper

    scene.add(new THREE.AxesHelper(20));

    // textures

    const loader = new THREE.TextureLoader();
    const texture = loader.load('textures/sprites/disc.png');
    texture.colorSpace = THREE.SRGBColorSpace;

    group = new THREE.Group();
    scene.add(group);

    // points
    // let vector1 = new THREE.Vector3(0, 1, 1).normalize();
    // let vector2 = new THREE.Vector3(1, 1, 0).normalize();
    
    // scene.add(new THREE.ArrowHelper(vector1, new THREE.Vector3(), 10, 0x0000ff));
    // scene.add(new THREE.ArrowHelper(vector2, new THREE.Vector3(), 10, 0x00ff00));

    // if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data


    window.addEventListener('resize', onWindowResize);
    // // Add event listener for the button
    const visualizeButton = document.getElementById('visualizeButton');
    visualizeButton.addEventListener('click', processText);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

// function animate() {

//     requestAnimationFrame(animate);

//     group.rotation.y += 0.005;

//     render();

// }

function processText() {
    const inputText = textInput.value;

    // Call your Python script or any processing function here
    // Example: Assume there's a Python script 'process_text.py'
    // You can use fetch or other methods to communicate with a server running your Python script
    // For simplicity, this example generates a random three-dimensional vector
    const outputVector = generateRandomVector();

    // Visualize the output
    visualizeVector(outputVector);
}

function generateRandomVector() {
    return new THREE.Vector3(
        Math.random() * 10 - 5, // X coordinate between -5 and 5
        Math.random() * 10 - 5, // Y coordinate between -5 and 5
        Math.random() * 10 - 5  // Z coordinate between -5 and 5
    );
}

function visualizeVector(vector) {
    // Clear previous visualization
    visualizationContainer.innerHTML = '';

    // Create a new visualization
    const vectorText = document.createElement('div');
    vectorText.innerHTML = `Vector: (${vector.x.toFixed(2)}, ${vector.y.toFixed(2)}, ${vector.z.toFixed(2)})`;
    visualizationContainer.appendChild(vectorText);
}

function animate() {
    // Rotate the axes in the scene
    scene.traverse((object) => {
        if (object instanceof THREE.AxesHelper || object instanceof THREE.ArrowHelper) {
            object.rotation.x += 0.001; // Adjust the rotation speed as needed
            object.rotation.y += 0.001;
        }
    });

    // Render the scene
    renderer.render(scene, camera);

    // Call animate again on the next frame
    requestAnimationFrame(animate);
}

function render() {

    renderer.render(scene, camera);

}