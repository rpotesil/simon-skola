export const toggleFullScreen = () => {
    // element.webkitRequestFullScreen(); 
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}