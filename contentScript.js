const twitterBirdPath = "M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z";
const twitterBirdColor = "#1da1f2"
const newFaviconURL = 'twitter_bird.ico'; // Update this path to where your 'twitter.ico' is hosted

function replaceLogo() {
  // Select the main header based on its role
  const headerElement = document.querySelector('header[role="banner"]');

  if (headerElement) {
    // Look for an SVG within the header
    const svgElement = headerElement.querySelector('svg');

    if (svgElement) {
      // Find the first path element within the SVG (assuming the logo is the first path)
      const pathElement = svgElement.querySelector('path');

      if (pathElement) {
        pathElement.setAttribute("d", twitterBirdPath);
        pathElement.style.visibility = "visible";
        pathElement.style.fill = twitterBirdColor;
      }
    }
  }
}

function faviconIsNotTwitterBird() {
  // Get the favicon link element from the DOM
  const linkElement = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');

  // If the favicon exists and its href is not the desired Twitter bird icon, return true
  return linkElement ? linkElement.href !== newFaviconURL : true;
}

function replaceFavicon() {
  // Get the favicon link element from the DOM
  let linkElement = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');

  if (faviconIsNotTwitterBird()) { 
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.rel = 'icon';
      document.head.appendChild(linkElement);
    }

    // Add a timestamp to the URL to force a refresh
    const timestamp = new Date().getTime();
    const URL = `${newFaviconURL}?v=${timestamp}`; 

    // Replace the href attribute with the new favicon URL
    linkElement.href = URL;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  replaceLogo(); // Replace the logo on initial page load
  replaceFavicon(); // Replace the favicon on initial page load
});

// Observe the DOM for changes and run the script when a change is detected
function observeDOMChanges() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList" && mutation.addedNodes.length) {
        replaceLogo(); // Replace the logo on DOM changes
        replaceFavicon(); // Replace the favicon on DOM changes
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Add a listener to run the script whenever a change is detected
window.onload = observeDOMChanges;
