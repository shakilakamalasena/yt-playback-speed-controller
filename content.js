function addSpeedControls() {
    // Check if controls already exist
    if (document.getElementById("yt-speed-controls")) return;

    // Find the video title container
    const titleContainer = document.querySelector("#above-the-fold #title h1");
    if (!titleContainer) return;

    // Ensure the parent container is a flex container
    const parentContainer = titleContainer.parentElement;
    parentContainer.style.display = "flex";
    parentContainer.style.alignItems = "center";

    // Container for the speed buttons
    const speedContainer = document.createElement("span");
    speedContainer.id = "yt-speed-controls";
    speedContainer.innerHTML = `
      <button id="speed-decrease">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="12" x2="6" y2="12"></line>
        </svg>
      </button>
      <span id="current-speed">1.0x</span>
      <button id="speed-increase">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="18" x2="12" y2="6"></line>
          <line x1="6" y1="12" x2="18" y2="12"></line>
        </svg>
      </button>
    `;
    parentContainer.appendChild(speedContainer);

    // Add event listeners for buttons
    const videoPlayer = document.querySelector("video");
    if (!videoPlayer) return;

    const currentSpeedDisplay = document.getElementById("current-speed");

    document.getElementById("speed-decrease").addEventListener("click", () => {
        let currentSpeed = parseFloat(videoPlayer.playbackRate);
        if (currentSpeed > 0.25) {
            currentSpeed = Math.max(0.25, currentSpeed - 0.25);
            videoPlayer.playbackRate = currentSpeed;
            currentSpeedDisplay.textContent = `${currentSpeed.toFixed(2)}x`;
        }
    });

    document.getElementById("speed-increase").addEventListener("click", () => {
        let currentSpeed = parseFloat(videoPlayer.playbackRate);
        if (currentSpeed < 2.0) {
            currentSpeed = Math.min(2.0, currentSpeed + 0.25);
            videoPlayer.playbackRate = currentSpeed;
            currentSpeedDisplay.textContent = `${currentSpeed.toFixed(2)}x`;
        }
    });
}

// Observe DOM changes and add controls when necessary
const observer = new MutationObserver(() => {
    if (document.querySelector("#above-the-fold #title h1")) {
        addSpeedControls();
        observer.disconnect(); // Stop observing after injecting controls
    }
});

observer.observe(document.body, { childList: true, subtree: true });