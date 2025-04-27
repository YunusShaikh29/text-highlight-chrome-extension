// Context menu setup
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "save-highlight",
      title: "Save Highlight",
      contexts: ["selection"]
    });
  });
  
  // Save highlight handler
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "save-highlight" && tab?.id) {
      const highlight = {
        text: info.selectionText,
        url: tab.url,
        timestamp: Date.now()
      };
      
      chrome.storage.local.get({ highlights: [] }, (data) => {
        chrome.storage.local.set({
          highlights: [...data.highlights, highlight]
        });
      });
    }
  });