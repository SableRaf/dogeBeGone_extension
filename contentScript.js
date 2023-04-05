function hideSpecifiedElement() {
  const targetPathSelector = 'path[d="M2.412.974h19.176v22.052H2.412z"]';
  const pathElement = document.querySelector(targetPathSelector);

  if (pathElement) {
    pathElement.style.visibility = "hidden";
  }
}

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

window.onload = observeDOMChanges;

hideSpecifiedElement();
