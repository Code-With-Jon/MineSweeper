//CONSTANTS
let gridWidth = 20;
let gridHeight = 20;

//CASHED
let bodyEl = document.querySelector('#grid-container');
let gridEl = document.querySelector('body')
let playAgain = document.getElementById('reset');
let currentCell;
let bombCounter = 0;
let cells = {
    topLeft: 0,
    topMid: 0,
    topRight: 0,
    leftCenter: 0,
    rightCenter: 0,
    bottomLeft: 0,
    bottomMid: 0,
    bottomRight: 0
}

let counter = 1;
for (let i = 0; i < gridHeight; i++) {
    for (let j = 0; j < gridWidth; j++) {
        let cellEl = document.createElement('div');
        bodyEl.appendChild(cellEl);
        cellEl.setAttribute("id", counter);
        counter++;
        cellEl.addEventListener('click', checkNeighbors)
    }
}

function init() {
    bodyEl.style.visibility = 'visible'
    gridEl.style.background = 'white';
}


function checkNeighbors(e) {
    if (bombs.indexOf(e)) {
        bodyEl.style.visibility = 'hidden'
        gridEl.style.background = 'url("https://upload.wikimedia.org/wikipedia/commons/9/95/Bomb_icon.svg") no-repeat center';
        playAgain.addEventListener('click', init)
    }
    checkEdges(e.target.id);
    checkTop(e);
    checkMid(e)
    checkBottom(e);
    for (let prop in cells) {
        if (bombs.includes(cells[prop])) {
            bombCounter += 1;
        }
    }
    e.target.textContent = bombCounter;
    e.target.style.backgroundColor = 'rgb(30, 75, 77)'
    e.target.style.color = 'white';
    e.target.style.textAlign = 'center';
    console.log(bombCounter);
    bombCounter = 0;
}

function checkSelf(currentCell) {

}

function checkEdges(currentCell) {
    //left
    if ((parseInt(currentCell) - 1) % 20 === 0) {
        console.log('Left Hit');
    }
    //right
    if (parseInt(currentCell) % 20 === 0) {
        console.log('Right Hit');
    }
    if (parseInt(currentCell) - 20 < 1) {
        console.log('Top Edge');
    }
    if (parseInt(currentCell) + 20 > 400) {
        console.log('Bottom Edge');
    }
}

function checkTop(e) {
    console.log(e.target)
    currentCell = e.target.getAttribute('id');
    console.log(currentCell);

    //Top Neighbor
    cells.topMid = parseInt(currentCell) - 20;
    cells.topLeft = parseInt(currentCell) - 21;
    cells.topRight = parseInt(currentCell) - 19;





    //console.log(cells.topLeft, cells.topMid, cells.topRight);
}

function checkBottom(e) {


    currentCell = e.target.getAttribute('id');
    cells.bottomMid = parseInt(currentCell) + 20;
    cells.bottomLeft = parseInt(currentCell) + 19;
    cells.bottomRight = parseInt(currentCell) + 21;



    // console.log(cells.bottomLeft, cells.bottomMid, cells.bottomRight);
}

function checkMid(e) {
    //currentCell = e.target.getAttribute('id');
    cells.leftCenter = parseInt(currentCell) - 1;
    cells.rightCenter = parseInt(currentCell) + 1;


    //console.log(cells.leftCenter, cells.rightCenter);
}

let bombs = [];
function generateBombs() {
    for (let i = 0; i <= 15; i++) {
        bombs.push(Math.floor(Math.random() * 20 + 1));
    }
    //  console.log(bombs)
}

generateBombs();