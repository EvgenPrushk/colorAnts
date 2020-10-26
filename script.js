const canvas = document.querySelector('canvas');
const context  = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const  ants = [];
for ( let i = 0; i < 10000; i++) {
    ants.push({
        x: getRandomBetween(0, canvas.width),
        y: getRandomBetween(0, canvas.height),
        color: getRandomColor(),
    })
}


//  генератор расположения точек на canvas
function getRandomBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

//задание случайного цвета точки
function getRandomColor(params) {
    return `rgb(${getRandomBetween(0, 255)}, ${getRandomBetween(0, 255)}, ${getRandomBetween(0, 255)})`
}

function getRandomFrom(...array) {
    return array[getRandomBetween(0, array.length - 1)];
}



// патерн стратегия
requestAnimationFrame(tick);

function tick() {
    requestAnimationFrame(tick);
    for (const ant  of ants) {
        getRandomFrom(
           () => ant.x++,
           () => ant.x--,
           () => ant.y++,
           () => ant.y--,
           
        )()

        if (ant.x < 0 ) { ant.x = 0}
        if (ant.y < 0 ) { ant.y = 0}
        if (ant.x > canvas.width ) { ant.x = canvas.width}
        if (ant.y > canvas.height ) { ant.y = canvas.height}
    }

    for (const ant of ants) {
        context.beginPath();
        context.fillStyle = ant.color;
        context.arc(ant.x, ant.y, 5, 0, 2 * Math.PI);
        context.fill();
    }

}