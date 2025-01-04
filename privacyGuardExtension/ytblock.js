const removeads = () => {
    const videoads = document.querySelector('.video-ads, .ytp-ad-module');
    videoads.forEach(ad => ad.remove());
    const banners = document.querySelectorAll('#masthead-ad, .ytp-ad-overlay-container');
    banners.forEach(banner => banner.remove());
    const sidebarads = document.querySelector('.ytd-promoted-sparkles-text-search-renderer');
    sidebarads.forEach(sidebarads => sidebarads.remove());
};
const observer = new MutationObserver(() => {
    removeads();
});
observer.observe(document.body, {childList:true, subtree: true});
removeads();