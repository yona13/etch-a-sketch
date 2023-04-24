/** Etch-a-Sketch Script */

/* Return Random 2-digit Heximal Number */
function random256() {
    return Math.floor(Math.random() * 255);
}

/* Random Colour Event Listener */
function randomColour(event) {
    event.target.style.backgroundColor = `rgb(${random256()}, ${random256()}, ${random256()})`;
}

/* Return Colour to Original Event Listner */
function returnColour(event) {
    event.target.style.backgroundColor = "#d9dbf1";
}

/* Increase Darkness Event Listener */
function increaseDarkness(event) {
    if (cells[event.target.id] === undefined) {
        cells[event.target.id] = 100;
    }
    cells[event.target.id] -= 10;
    event.target.style.filter = `brightness(${cells[event.target.id] -= 10}%)`;
}

/* Get Cell Count Function */
function getCellCount(width, height) {
    const x = Math.round(width / 16);
    const y = Math.round(height / 16);

    return x * y
}

/* Setup Grid Function */
function setupGrid(n) {
    container.innerHTML = "";
    if (n <= 0) {
        container.setAttribute("style", `margin: 0`);
        const cellCount = getCellCount(w, h);
        for (var i = 0; i < cellCount; i++) {
            const newDiv = document.createElement("div");
            newDiv.className = "cell";
            newDiv.id = `cell-${i}`;
            if (randomToggle) {
                newDiv.addEventListener('mouseenter', randomColour);
                newDiv.addEventListener('mouseleave', returnColour);
            }
            if (increaseToggle) {
                newDiv.addEventListener('mouseover', increaseDarkness);
            }
            container.appendChild(newDiv);
        }
    } else {
        if (n > 100) n = 100;
        const side = 16 * n;
        const xMargin = Math.round((w - side) / 2);
        const yMargin = Math.round((h - side) / 2);
        const cellCount = getCellCount(side, side);
        container.setAttribute("style", `margin: ${yMargin}px ${xMargin}px`);

        for (var i = 0; i < cellCount; i++) {
            const newDiv = document.createElement("div");
            newDiv.className = "cell";
            newDiv.id = `cell-${i}`;
            if (randomToggle) {
                newDiv.addEventListener('mouseenter', randomColour);
                newDiv.addEventListener('mouseleave', returnColour);
            }
            container.appendChild(newDiv);
        }
    }
}

/* Container Variables */
const body = document.body,
html = document.documentElement;
let randomToggle = false;
let increaseToggle = false;
let cells = {};

var w = Math.max(body.scrollWidth, body.offsetWidth, 
                 html.clientWidth, html.scrollWidth, html.offsetWidth);
var h = Math.max(body.scrollHeight, body.offsetHeight, 
                 html.clientHeight, html.scrollHeight, html.offsetHeight);

const container = document.querySelector(".container");
setupGrid(0);

// Update Grid Size
let side = 0;
const updateButton = document.querySelector(".update");
updateButton.addEventListener('click', (event) => {
    const value = prompt("Please enter a number to change the number of squares per side of the grid:");
    if (!isNaN(value)) {
        side = parseInt(value);
        setupGrid(side);
    }
});

// Extra Credit Random Colours
const randomButton = document.querySelector(".random");
randomButton.addEventListener('click', (event) => {
    randomToggle = !randomToggle;
    increaseToggle = false;
    setupGrid(side);
});

// Extra Credit Increase Darkening
const increaseButton = document.querySelector(".increase");
increaseButton.addEventListener('click', (event) => {
    increaseToggle = !increaseToggle;
    randomToggle = false;
    setupGrid(side);
});

const resetButton = document.querySelector(".reset");
resetButton.addEventListener('click', (event) => {
    randomToggle = false;
    increaseToggle = false;
    setupGrid(side);
});