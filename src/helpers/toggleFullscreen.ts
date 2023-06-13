export const toggleFullScreen = () => {
    const d: any = window.document;
    if (d.fullscreenElement || d.webkitFullscreenElement || d.mozFullScreenElement || d.msFullscreenElement) {
        exitFullscreen();
    } else {
        enterFullscreen();
    }
}


// Function to enter fullscreen
function enterFullscreen() {
    var element: any = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

// Function to exit fullscreen
function exitFullscreen() {
    const d: any = window.document;
    if (d.exitFullscreen) {
        d.exitFullscreen();
    } else if (d.webkitExitFullscreen) {
        d.webkitExitFullscreen();
    } else if (d.mozCancelFullScreen) {
        d.mozCancelFullScreen();
    } else if (d.msExitFullscreen) {
        d.msExitFullscreen();
    }
}