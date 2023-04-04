function hideSpecifiedElement() {

  const targetSelector = 'a[aria-label="Twitter"][role="link"]';
  const twitterElements = document.querySelectorAll(targetSelector);

  for (const element of twitterElements) {
    element.style.visibility = "hidden";
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
