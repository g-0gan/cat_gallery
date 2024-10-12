let counter = 0;
let timer;
const imgElement = document.getElementById('cat-img');
const counterElement = document.getElementById('counter');
const intervalInput = document.getElementById('interval');

// Fetch cat image
function fetchCatImage() {
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => {
            imgElement.onload = () => {
                counter++; // Increase counter after the image loads
                counterElement.innerText = counter; // Update counter
            };
            imgElement.src = data[0].url; // Update the image
        })
        .catch(error => console.error('Error fetching the image:', error));
}

// Update interval
function updateInterval() {
    clearInterval(timer); // Clear the previous timer

    const interval = parseInt(intervalInput.value, 10) * 1000;
    if (interval > 0) {
        counter = 0; // Reset the counter
        counterElement.innerText = counter; // Update counter display
        fetchCatImage(); // Get a new image
        timer = setInterval(fetchCatImage, interval); // Start a new interval
    } else {
        alert('Please enter a positive number!'); // Alert for invalid input
    }
}

// Run on page load
window.onload = () => {
    counterElement.innerText = 0; // Set initial counter value
    intervalInput.addEventListener('input', updateInterval); // Add event handler
    updateInterval(); // Start the update interval
};