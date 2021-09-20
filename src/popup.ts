import { RatingSiteURL } from './contanst.js';

function searchVideoRating(url: RatingSiteURL): void {
  const { value: videoName } = (<HTMLInputElement>document.getElementById('movie_name_input')); 
  chrome.tabs.create({url: `${url}?q=${videoName}`});
}

function syncInputFromStorage(): void {
  chrome.storage.sync.get('videoName', (data) => {
    const { videoName } = data;
    document.getElementById('movie_name_input').setAttribute('value', videoName);
  });
}

function syncStorageFromInput(): void {
  const videoName = this.value;
  chrome.storage.sync.set({ videoName }, function() {
    console.log('The videoName is set to ' + videoName);
  });
}

try {
  document.addEventListener('DOMContentLoaded', () => syncInputFromStorage());

  document.getElementById('google_search_btn').addEventListener('click', () => searchVideoRating(RatingSiteURL.GOOGLE));
  document.getElementById('douban_search_btn').addEventListener('click', () => searchVideoRating(RatingSiteURL.DOUBAN));
  document.getElementById('imdb_search_btn').addEventListener('click', () => searchVideoRating(RatingSiteURL.IMDB));

  document.getElementById("movie_name_input").addEventListener('blur', () => syncStorageFromInput());

} catch (e) {
  console.error(`popup page exception: ${e}`);
}
