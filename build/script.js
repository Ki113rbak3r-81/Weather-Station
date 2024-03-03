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
const airportCode = document.getElementById("airport-code");

const circleX = canvas.width / 2;
const circleY = canvas.height / 2;
const circleRadius = canvas.height / 5;

// const conditionImgsPath = "../imgs/conditions";
// const trendImgsPath = "../imgs/trends";


const draw = () => {
    context.clearRect(0, 0, canvas.clientWidth, canvas.height);

    drawText(level(temp, 140, -80), circleX - circleRadius * 1.5, circleY - circleRadius * 1.5);
    drawText(level(dew, 140, -80), circleX - circleRadius * 1.5, circleY + circleRadius);
    drawCurrent(current.value, circleX + circleRadius, circleY - circleRadius * 1.5);
    drawTrend(level(change, 9.9, -9.9), trend.value);
    drawWind(level(speed, 250, 0), levelDirection(direction));
    circle(cover.value);
    drawText(level(vision, 50, 0), circleX - circleRadius * 3, circleY - circleRadius / 2);
    drawText(visionFrac.value, circleX - circleRadius * 2.25, circleY - circleRadius / 2);
    drawCondition(condition.value);
    drawText(airportCode.value.toUpperCase(), circleX + circleRadius * 1.25, circleY + circleRadius);
}

// const fetchImagePaths = async (folderPath) => {
//     const response = await fetch(folderPath);
//     const data = await response.text();
//     const imagePaths = data.trim().split("\n");
//     return imagePaths;
// }

// const fetchAllImagePaths = async () => {
//     const conditionImgsPath = await fetchImagePaths(conditionImgsPath);
//     const trendImgsPath = await fetchImagePaths(trendImgsPath);
//     return { condition: conditionImgsPath, trend: trendImgsPath };
// }

// const loadImages = async () => {
//     const imagePaths = await fetchAllImagePaths();
//     const conditionImgs = await Promise.all(imagePaths.condition.map(path => loadImage(path)));
//     const trendImages = await Promise.all(imagePaths.trend.map(path => loadImage(path)));
//     return { condition: conditionImgs, trend: trendImages };
// }

const level = (val, max, min) => {
    let newValue = val.value;
    if (val.value > max) {
        newValue = max;
    } else if (val.value < min) {
        newValue = min;
    }
    if (newValue !== val.value) {
        val.value = newValue;
    }
    return newValue;
}

const levelDirection = (direction) => {
    let newDir = direction.value;
    if (direction.value > 360) {
        newDir = direction.value % 360;
    } else if (direction.value < 0) {
        newDir = (direction.value % 360) + 360;
    }
    if (newDir !== direction.value) {
        direction.value = newDir;
    }
    return newDir;
}




const drawTrend = (changeVal, trendVal) => {
    const imagePath = `../imgs/trends/${trendVal}.png`;
    loadImage(imagePath)
        .then(img => {
            context.drawImage(img, circleX + circleRadius * 2.3, circleY);
        })
        .catch(e => {
            console.error("Error loading trend image: ", e);
        });
    if (changeVal > 0) {
        drawText(`+${changeVal}`, circleX + circleRadius + circleRadius / 5, circleY);
    } else {
        drawText(changeVal, circleX + circleRadius + circleRadius / 5, circleY);
    }
    
}

const drawCondition = (conditionVal) => {
    const imagePath = `../imgs/conditions/${conditionVal}.png`;
    loadImage(imagePath)
        .then(img => {
            context.drawImage(img, circleX - circleRadius * 1.8, circleY);
        })
        .catch(e => {
            console.error("Error loading condition image: ", e);
        });
}

const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = src;
    });
}

const drawWind = (speedVal, directionVal) => {
    const radians = (directionVal - 90) * Math.PI / 180;
    const flagLength = 100;
    const triangleSize = 16;
    const lineLength = 30;

    const flagStartX = circleX + Math.cos(radians) * circleRadius;
    const flagStartY = circleY + Math.sin(radians) * circleRadius;
    const flagEndX = flagStartX + Math.cos(radians) * flagLength;
    const flagEndY = flagStartY + Math.sin(radians) * flagLength;


    // drawTriangle(flagEndX, flagEndY, radians, triangleSize);


    context.beginPath();
    context.moveTo(flagStartX, flagStartY);

    if (speedVal <= 2) {
        context.arc(circleX, circleY, circleRadius * 1.2, 0, 2 * Math.PI);
    } else {
        context.lineTo(flagEndX, flagEndY);

        // 48 ~ 50 ~ 52
        // 8 ~ 10 ~ 12
        // 3 ~ 5 ~ 7
        // while (speedVal >= 3) {
        //     if (speedVal >= 48) {
        //         drawTriangle(-flagEndY, flagEndX, radians, triangleSize);
        //         speedVal -= 50;
        //     } else if (speedVal >= 8) {
        //         drawLine(flagEndX, flagEndY, flagEndX - Math.sin(radians), flagEndY + Math.cos(radians));
        //         speedVal -= 10;
        //     } else if (speedVal >= 3) {
        //         drawLine(flagEndX, flagEndY, flagEndX - Math.sin(radians), flagEndY + Math.cos(radians));
        //         speedVal -= 5;
        //     }
        // }
    }
    context.closePath();
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.stroke();

    
}

const drawTrianglePerp = (x, y, angle, size) => {
    const x1 = x + size * Math.cos(angle);
    const y1 = y + size * Math.sin(angle);
    
    const x2 = x1 + size * Math.cos(angle - Math.PI / 2);
    const y2 = y1 + size * Math.sin(angle - Math.PI / 2);
    
    const x3 = x1 + size * Math.cos(angle + Math.PI / 2);
    const y3 = y1 + size * Math.sin(angle + Math.PI / 2);

    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.closePath();
    context.fillStyle = "black";
    context.fill();
    context.strokeStyle = "black";
    context.stroke();
}

const drawText = (val, x, y, color = "black") => {
    context.font = "32px Arial";
    context.fillStyle = color;
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText(val, x, y)
}

const drawCurrent = (curVal, x, y) => {
    curVal = curVal.toString().replace(".", "");
    if (curVal >= 10000) {
        curVal = curVal.slice(2);
    } else {
        curVal = curVal.slice(1);
    }
    
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

const drawLine = (x1, y1, x2, y2, white = false) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
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

temp.addEventListener("input", draw);
dew.addEventListener("input", draw);
speed.addEventListener("input", draw);
direction.addEventListener("input", draw);
current.addEventListener("input", draw);
change.addEventListener("input", draw);
trend.addEventListener("input", draw);
cover.addEventListener("input", draw);
vision.addEventListener("input", draw);
visionFrac.addEventListener("input", draw);
condition.addEventListener("input", draw);
airportCode.addEventListener("input", draw);

draw();
