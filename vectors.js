import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

let group, camera, scene, renderer;

init();
animate();

function init() {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
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


    window.addEventListener('resize', onWindowResize);

    // Add event listener for the button
    const visualizeButton = document.getElementById('visualizeButton');
    visualizeButton.addEventListener('click', processText);    

}

function onWindowResize() {

    camera.aspect = window.innerWidth * 0.75 / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth * 0.75, window.innerHeight);

}

// function animate() {

//     requestAnimationFrame(animate);

//     group.rotation.y += 0.005;

//     render();

// }

function processText() {
    const inputText = textInput.value;

    const words = inputText.split(' ');

  // Assume your CSV file has the structure [id, x, y, z, word]
    Papa.parse('public/pca_vectors.csv', {
        download: true,
        header: true,
        complete: function (results) {
        const data = results.data;

        // Initialize average vector
        let averageVector = [0, 0, 0];

        // Loop through user input words and update the average vector
        words.forEach(word => {
            console.log(word);
            const entry = data.find(entry => entry.Word === word);
            if (entry){
                averageVector[0] += parseFloat(entry.X);
                averageVector[1] += parseFloat(entry.Y);
                averageVector[2] += parseFloat(entry.Z);
            };
                
        });

        // Calculate the average
        const numWords = words.length;
        averageVector = averageVector.map(value => value / numWords);

        console.log(averageVector);
        let outputVector = new THREE.Vector3((averageVector[0] * 10), (averageVector[1] * 10), (averageVector[2] * 10));
        // Visualize the output
        visualizeVector(outputVector);

        }
  });
    // $.ajax({
    //     type: "POST",
    //     url: "generate_embedding.py",
    //     data: { param: inputText },
    // }).done(function(response) {
    //     console.log("done")
    //     console.log(response);
    
    // }); 

   

    // visualizeVector(outputVector);
    
}

function generateRandomVector() {
    return new THREE.Vector3(
        Math.random() * 10 , 
        Math.random() * 10 ,
        Math.random() * 10 
    );
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function visualizeVector(vector) {
    scene.add(new THREE.ArrowHelper(vector, new THREE.Vector3(), 10, getRandomColor()));
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