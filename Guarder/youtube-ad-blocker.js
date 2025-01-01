console.log("YouTube Ad Blocker Loaded");

const removeAds = () => {
  const adSelectors = [
    '.video-ads',
    '.ytp-ad-module',
    '#masthead-ad',
    '.ytp-ad-overlay-container',
    '.ytd-promoted-sparkles-text-search-renderer',
    '.ytp-ad-skip-button'
  ];
  
  adSelectors.forEach(selector => {
    const ads = document.querySelectorAll(selector);
    ads.forEach(ad => ad.remove());
  });
};

const observer = new MutationObserver(() => {
  removeAds();
});

observer.observe(document.body, { childList: true, subtree: true });
removeAds(); // Initial removal on load

setInterval(removeAds, 1000); // Check every second
