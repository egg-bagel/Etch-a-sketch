let container = document.getElementById("container");
let reset = document.getElementById("reset");
let squaresNumber = 16; //default starting point

function newGame(squaresPerSide) {
    for (i = 0; i < squaresPerSide; i++) {
        let newRow = document.createElement("div");
        newRow.classList.add("row");
        container.appendChild(newRow);
        for (j = 0; j < squaresPerSide; j++) {
            let newDiv = document.createElement("div");
            newDiv.classList.add("cell");
            newRow.appendChild(newDiv);
        }
    }
}

//Gives a new random color to a cell that has not been marked as colored.
function randomColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);

    return `rgb(${x},${y},${z})`;
}

//Darkens the color of a cell that has already been colored. 
function darkenColor(currentColor) {
    let numberString = currentColor.substr(4).slice(0, -1);
    let numberArray = numberString.split(",");
    let x = parseInt(numberArray[0]);
    let y = parseInt(numberArray[1]);
    let z = parseInt(numberArray[2]);
    x = Math.floor(x - (0.2 * x));
    y = Math.floor(y - (0.2 * y));
    z = Math.floor(z - (0.2 * z));
    return `rgb(${x}, ${y}, ${z})`;
}

function resetGrid() {
    container.innerHTML = "";
    squaresNumber = window.prompt("How many squares for the new tablet?");
    newGame(squaresNumber);
    drawLines();
}

reset.addEventListener("click", resetGrid);

newGame(squaresNumber);
drawLines();

function drawLines() {
    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.addEventListener("mouseover", function() {
            if (cell.classList.contains("marked")) {
                let currentColor = cell.style.backgroundColor;
                let newColor = darkenColor(currentColor);
                cell.style.backgroundColor = newColor;
            }
            else if ((cell.classList.contains("marked")) === false) {
                let cellColor = randomColor();
                cell.style.backgroundColor = cellColor;
                cell.classList.add("marked");
            }
        })
    })
}