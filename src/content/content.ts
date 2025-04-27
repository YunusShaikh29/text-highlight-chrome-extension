// Detect text selection
document.addEventListener('mouseup', () => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      chrome.runtime.sendMessage({
        type: "SHOW_CONTEXT_MENU",
        text: selection
      });
    }
  });