const canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
const temp = document.getElementById("temperature");
const dew = document.getElementById("dew-point");
const speed = document.getElementById("speed");
const direction = document.getElementById("direction");
const current = document.getElementById("current");
const change = document.getElementById("change");
const trend = document.getElementById("trend");
const cover = document.getElementById("cover");
const vision = document.getElementById("vision");
const visionFrac = document.getElementById("frac");
const condition = document.getElementById("condition");

const circleX = canvas.width / 2;
const circleY = canvas.height / 2;
const circleRadius = canvas.height / 5;

const draw = () => {
    context.clearRect(0, 0, canvas.clientWidth, canvas.height);

    drawText(temp.value, circleX - circleRadius * 1.5, circleY - circleRadius * 1.5);
    drawText(dew.value, circleX - circleRadius * 1.5, circleY + circleRadius);
    drawCurrent(current.value, circleX + circleRadius, circleY - circleRadius * 1.5);
    // drawTrend(change.value, trend.value);
    drawWind(speed.value, direction.value);
    circle(cover.value);
    drawText(vision.value, circleX - circleRadius * 3, circleY - circleRadius / 2);
    drawText(visionFrac.value, circleX - circleRadius * 2.25, circleY - circleRadius / 2);
    // drawCondition(condition.value);

    
}

const drawWind = (speedVal, directionVal) => {
    const radians = (directionVal - 90) * Math.PI / 180;
    const flagLength = 100;

    const flagStartX = circleX + Math.cos(radians) * circleRadius;
    const flagStartY = circleY + Math.sin(radians) * circleRadius;
    const flagEndX = flagStartX + Math.cos(radians) * flagLength;
    const flagEndY = flagStartY + Math.sin(radians) * flagLength;


    context.beginPath();
    context.moveTo(flagStartX, flagStartY);
    context.lineTo(flagEndX, flagEndY);
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.stroke();
}


const drawText = (val, x, y) => {
    context.font = "32px Arial";
    context.fillStyle = "black";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText(val, x, y)
}

const drawCurrent = (curVal, x, y) => {

    curVal = curVal.toString().slice(2).replace(".", "");
    drawText(curVal, x, y);
}

const circle = (coverVal) => {
    context.beginPath();
    context.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.stroke();

    let portion = 0;
    switch (coverVal) {
        case "clear":
            portion = 0;
            break;
        case "cloud-1/8":
            portion = 1/8;
            break;
        case "2/8":
            portion = 1/4;
            break;
        case "3/8":
            portion = 3/8;
            break;
        case "4/8":
            portion = 1/2;
            break;
        case "5/8":
            portion = 5/8;
            break;
        case "6/8":
            portion = 3/4;
            break;
        case "7/8":
            portion = 7/8;
            break;
        case "overcast":
            portion = 1;
            break;
        case "obscured":
            portion = -1;
            break;
        case "missing":
            portion = -2;
            break;
    }

    drawCover(portion);
}

const drawCover = (frac) => {
    
    
    switch (frac) {
        case 0:
            break;
        case 1/8:
            drawLine(circleX, circleY - circleRadius, circleX, circleY + circleRadius);
            break;
        case 1/4:
            drawCircle(circleX, circleY, circleRadius, 0, 1.5 * Math.PI, true);
            break;
        case 3/8:
            drawCircle(circleX, circleY, circleRadius, 0, 1.5 * Math.PI, true);
            drawLine(circleX, circleY - circleRadius, circleX, circleY + circleRadius);
            break;
        case 1/2:
            drawCircle(circleX, circleY, circleRadius, Math.PI / 2, 3 * Math.PI / 2, true)
            break;
        case 5/8:
            drawCircle(circleX, circleY, circleRadius, Math.PI / 2, 3 * Math.PI / 2, true)
            drawLine(circleX, circleY, circleX - circleRadius, circleY)
            break;
        case 3/4:
            drawCircle(circleX, circleY, circleRadius, Math.PI, 3 * Math.PI / 2, true);
            break;
        case 7/8:
            drawCircle(circleX, circleY, circleRadius, 0, 2 * Math.PI, true);
            drawLine(circleX, circleY - circleRadius, circleX, circleY + circleRadius, true);
            break;
        case 1:
            drawCircle(circleX, circleY, circleRadius, 0, 2 * Math.PI, true);
            break;
        case -1:
            drawX();
            break;
        // case -2:
        //     drawM();
        //     break;
    }
}

// const drawM = () = > {

// }

const drawCircle = (x, y, r, s, e, c) => {
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, r, s, e, c);
    context.fillStyle = "black";
    context.fill();
}

const drawLine = (x, y, newx, newy, white = false) => {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(newx, newy);
    if (!white) {
        context.strokeStyle = "black";
    } else {
        context.strokeStyle = "white";
    }
    context.lineWidth = 5;
    context.stroke();
}

const drawX = () => {
    const x1 = circleX - circleRadius / Math.sqrt(2);
    const x2 = circleX + circleRadius / Math.sqrt(2);
    const y1 = circleY - circleRadius / Math.sqrt(2);
    const y2 = circleY + circleRadius / Math.sqrt(2);

    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.moveTo(x1, y2);
    context.lineTo(x2, y1);
    context.strokeStyle = "black";
    context.stroke();
}

temp.addEventListener("input", draw)
dew.addEventListener("input", draw)
speed.addEventListener("input", draw)
direction.addEventListener("input", draw)
current.addEventListener("input", draw)
change.addEventListener("input", draw)
trend.addEventListener("input", draw)
cover.addEventListener("input", draw)
vision.addEventListener("input", draw)
visionFrac.addEventListener("input", draw)
condition.addEventListener("input", draw)


draw()
