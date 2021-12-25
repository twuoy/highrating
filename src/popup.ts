import { RatingSiteURL, SEARCH_BTN_AND_SITE_MAP } from './contanst.js';

function searchVideoRating(url: RatingSiteURL): void {
  const { value: videoName } = (<HTMLInputElement>document.getElementById('movie_name_input')); 
  chrome.tabs.create({url: `${url}?q=${videoName}`});
}

function syncInputWithStorage(): void {
  chrome.storage.sync.get('videoName', ({ videoName }) => {
    document.getElementById('movie_name_input').setAttribute('value', videoName)
  });
}

function syncStorageWithInput(): void {
  const videoName: string = this.value;
  chrome.storage.sync.set({ videoName }, () => {
    console.log(`The videoName in storage is set to ${videoName}`)
  });
}

try {
  document.addEventListener('DOMContentLoaded', () => syncInputWithStorage());
  document.getElementById("movie_name_input").addEventListener('blur', () => syncStorageWithInput());

  for (const [btnName, siteURL] of Object.entries(SEARCH_BTN_AND_SITE_MAP)) {
    document.getElementById(btnName).addEventListener('click', () => searchVideoRating(siteURL));
}

} catch (e) {
  console.error(`popup page exception: ${e}`);
}
