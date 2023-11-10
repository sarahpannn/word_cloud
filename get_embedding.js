let scene, camera, renderer;
let textInput, visualizationContainer;

// function init() {
//     // Your existing Three.js initialization code goes here

//     // Get references to HTML elements
//     textInput = document.getElementById('textInput');
//     visualizationContainer = document.getElementById('visualization');
// }

function init() {
    // Your existing Three.js initialization code goes here

    // Get references to HTML elements
    textInput = document.getElementById('textInput');
    visualizationContainer = document.getElementById('visualization');

    // Add event listener for the button
    const visualizeButton = document.getElementById('visualizeButton');
    visualizeButton.addEventListener('click', processText);
}


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
