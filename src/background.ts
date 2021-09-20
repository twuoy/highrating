// module names must start with a path and end with an extension like .js or .mjs
// ref: https://stackoverflow.com/questions/66406672/chrome-extension-mv3-modularize-service-worker-js-file/66408379#66408379
import { RatingSiteURL } from './contanst.js';
import { doubanMenuItem, popupMenuItem } from './menuItem.js';

// add try catch to avoid "Uncaught SyntaxError: Cannot use import statement outside a module" exception
try {
  chrome.contextMenus.create(popupMenuItem);
  chrome.contextMenus.create(doubanMenuItem);

  chrome.contextMenus.onClicked.addListener((clickItem) => {
    const { menuItemId, selectionText: selectedText } = clickItem;
    if (!selectedText) return;

    switch (menuItemId) {
      case "SearchRatingOnDouban":
        chrome.tabs.create({url: `${RatingSiteURL.DOUBAN}?q=${selectedText}`});
        break;
      case "SearchRatingOnPopup":
        chrome.storage.sync.set({ videoName: selectedText }, function() {
          console.log('The videoName is set to ' + selectedText);
        });
        break;
      default:
        console.error(`Do not support the selected menu item: ${menuItemId}`);
    }
  });

} catch (e) {
  console.error(`backgroung page exception: ${e}`);
}
