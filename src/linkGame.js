const linkGame = {
    show: () => {
        const questions = getRandomIds(learnData);
        let butStr = questions.map((o, i) => {
            let item = learnData.filter(l=>l.id==o)[0];
            return `
            <div class="answer" id="an1">
                <span class="play"></span>
                <span class="text">${item.en}</span>
            </div>
            `}).join('');
        var pageHtml = `
    <div class="challenge">
        <div class="challenge-inner">
            ${butStr}
        </div>
    </div>`;
        app.innerHTML = pageHtml;
        // ed("welcomeButton").addEventListener("click", function () {
        //     alert("test");            // Code to handle button click

        // });

    }
}

const pageHtml = `
<div id="box"></div>

<svg id="svg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
	<path id="path" stroke="#333" stroke-width="3" fill="none"/>
</svg>
`;


// var box = document.getElementById("box");
// var svg = document.getElementById("svg");
// var path = document.getElementById("path");
// var isDragging = false;
// var startX, startY;

// box.addEventListener("mousedown", startDragging);
// box.addEventListener("touchstart", function (e) {
//     startDragging(e.changedTouches[0]);
// });

// document.addEventListener("mousemove", function (e) {
//     if (isDragging) {
//         drawLine(e.clientX, e.clientY);
//     }
// });
// document.addEventListener("touchmove", function (e) {
//     if (isDragging) {
//         drawLine(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
//     }
// });

// document.addEventListener("mouseup", stopDragging);
// document.addEventListener("touchend", stopDragging);

// function startDragging(e) {
//     isDragging = true;
//     startX = e.clientX || e.touches[0].clientX;
//     startY = e.clientY || e.touches[0].clientY;

//     drawLine(startX, startY);
// }

// function stopDragging() {
//     if (isDragging) {
//         drawLineEnd();
//     }
//     isDragging = false;
// }

// function drawLine(x, y) {
//     var rect = box.getBoundingClientRect();
//     var x_rel = x - rect.left;
//     var y_rel = y - rect.top;

//     var d = "M" + startX + "," + startY + " L" + x_rel + "," + y_rel;
//     path.setAttribute("d", d);
// }

// function drawLineEnd() {
//     path.setAttribute("d", "");
// }