const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    
    // Store the triggered event
    window.deferredPrompt = event;

    // Remove the hidden class from the button
    butInstall.classList.toggle('hidden', false);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // Show the install prompt
    promptEvent.prompt();

    // Wait for the user to respond to the prompt
    const result = await promptEvent.userChoice;
    
    // Reset the deferredPrompt variable; it can only be used once
    window.deferredPrompt = null;

    // Hide the install button
    butInstall.classList.toggle('hidden', true);

    // Optionally, log the result (useful for debugging)
    console.log('User choice:', result.outcome);
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear the deferredPrompt
    window.deferredPrompt = null;

    console.log('PWA was installed.', event);
});
