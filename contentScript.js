// This script is injected into the page and runs in the context of the page
// It is responsible for hiding the logo on the page
// It targets the path element with the specified d attribute value
// Note: This may be fragile and break if the logo is updated or the d attribute value changes
function hideSpecifiedElement() {
  const targetPathSelector = 'path[d="M2.412.974h19.176v22.052H2.412z"]';
  const pathElement = document.querySelector(targetPathSelector);

  if (pathElement) {
    pathElement.style.visibility = "hidden";
  }
}

// Observe the DOM for changes and run the script when a change is detected
function observeDOMChanges() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList" && mutation.addedNodes.length) {
        hideSpecifiedElement();
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Add a listener to run the script whenever a change is detected
window.onload = observeDOMChanges;

// Run once to hide the logo on the initial page load
hideSpecifiedElement();
