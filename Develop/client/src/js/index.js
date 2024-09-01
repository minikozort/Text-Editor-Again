import { Workbox } from 'workbox-window'; // Import the Workbox library for service worker management
import Editor from './editor'; // Import the Editor class or module
import './database'; // Import the database module to initialize the database
import '../css/style.css'; // Import the CSS file for styling

const main = document.querySelector('#main'); // Select the main element in the HTML document
main.innerHTML = ''; // Clear any existing content inside the main element

// Function to load a spinner while the editor is being initialized
const loadSpinner = () => {
  const spinner = document.createElement('div'); // Create a new div element for the spinner
  spinner.classList.add('spinner'); // Add the 'spinner' class to the div
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `; // Set the inner HTML to create a spinner animation
  main.appendChild(spinner); // Append the spinner to the main element
};

const editor = new Editor(); // Instantiate the Editor class

// If the editor is not initialized, load the spinner
if (typeof editor === 'undefined') {
  loadSpinner(); // Call the function to load the spinner
}

// Check if service workers are supported in the current browser
if ('serviceWorker' in navigator) {
  // Register the Workbox service worker using the source file '/src-sw.js'
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register(); // Register the service worker
} else {
  // Log an error if service workers are not supported in this browser
  console.error('Service workers are not supported in this browser.');
}
