

//CONSTANTS
let gridWidth = 20;
let gridHeight = 20;

//CASHED
let bodyEl = document.querySelector('#grid-container');
let gridEl = document.querySelector('body')
let playAgain = document.querySelector('#reset');
let currentCell;
let cellEl;
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
let edge = false;
let counter = 1;
let bombs = [];
let leftEdge = false;
let rightEdge = false;
let topEdge = false;
let bottomEdge = false;

for (let i = 0; i < gridHeight; i++) {
    for (let j = 0; j < gridWidth; j++) {
        cellEl = document.createElement('div');
        bodyEl.appendChild(cellEl);
        cellEl.setAttribute("id", counter);
        counter++;
        cellEl.addEventListener('click', checkNeighbors)
    }
}

function init() {

    bodyEl.style.visibility = 'visible'
    gridEl.style.background = 'white';
    cells = {
        topLeft: 0,
        topMid: 0,
        topRight: 0,
        leftCenter: 0,
        rightCenter: 0,
        bottomLeft: 0,
        bottomMid: 0,
        bottomRight: 0
    }


}

function recursiveSearch(domObject) {
    let bombCounter = 0;
    if (bombs.includes(parseInt(domObject.id))) {
        bodyEl.style.visibility = 'hidden'
        gridEl.style.background = 'url("https://upload.wikimedia.org/wikipedia/commons/9/95/Bomb_icon.svg") no-repeat center';
        playAgain.addEventListener('click', init)
    }
    checkEdges(domObject);
    checkTop(domObject);
    checkMid(domObject)
    checkBottom(domObject);
    for (let prop in cells) {
        if (bombs.includes(cells[prop])) {
            bombCounter += 1;
        }
    }
    domObject.textContent = bombCounter;
    domObject.style.backgroundColor = 'rgb(30, 75, 77)'
    domObject.style.color = 'white';
    domObject.style.textAlign = 'center';

    console.log(bombCounter);

    if (bombCounter !== 0 && domObject === 'active') {
        return;
    } else {
        console.log('HITTTTTTT')
        if (bombCounter === 0 && bottomEdge === false && domObject !== 'active') {
            recursiveSearch(document.getElementById(`${parseInt(domObject.id) + 20}`));
            domObject.classList.add('active');
            recursiveSearch(document.getElementById(`${parseInt(domObject.id) + 21}`));
            domObject.classList.add('active');
            recursiveSearch(document.getElementById(`${parseInt(domObject.id) + 19}`));

        }
        if (bombCounter === 0 && topEdge === false && domObject !== 'active') {
            recursiveSearch(document.getElementById(`${parseInt(domObject.id) - 20}`));
            domObject.classList.add('active');

            recursiveSearch(document.getElementById(`${parseInt(domObject.id) - 21}`));
            domObject.classList.add('active');

            recursiveSearch(document.getElementById(`${parseInt(domObject.id) - 19}`));
            domObject.classList.add('active');
        }
        if (bombCounter === 0 && rightEdge === false && domObject !== 'active') {
            recursiveSearch(document.getElementById(`${parseInt(domObject.id) + 1}`));
            domObject.classList.add('active');
        }
        if (bombCounter === 0 && leftEdge === false && domObject !== 'active') {
            recursiveSearch(document.getElementById(`${parseInt(domObject.id) - 1}`));
            domObject.classList.add('active');
        }
    }



    // if ((bombCounter === 0 &&
    //     (parseInt(domObject.id) + 20) < 400 &&
    //     (parseInt(domObject.id) - 20) > 1 &&
    //     (parseInt(domObject.id) % 20 !== 0) &&
    //     (parseInt(domObject.id) - 1) % 20 !== 0)) {
    //     console.log('SHOW CELL');
    //     console.log(document.getElementById(`${parseInt(domObject.id) + 20}`));


    // }
    // else {
    //     return;
    // }

}



function checkNeighbors(e) {
    recursiveSearch(e.target);

}

function checkEdges(currentCell) {

    //left
    if ((parseInt(currentCell.id) - 1) % 20 === 0) {
        console.log('Left Hit');
        leftEdge = true;
    }

    //right

    if (parseInt(currentCell.id) % 20 === 0) {
        console.log('Right Hit');
        rightEdge = true;
    }
    //top

    if (parseInt(currentCell.id) - 20 < 1) {
        console.log('Top Edge');
        topEdge = true
    }
    //bottom

    if (parseInt(currentCell.id) + 20 > 400) {
        console.log('Bottom Edge');
        bottomEdge = true;
    }
    return leftEdge, rightEdge, topEdge, bottomEdge;
}

function checkTop(e) {

    currentCell = e.id;
    console.log(currentCell);

    //Top Neighbor
    cells.topMid = parseInt(currentCell) - 20;
    cells.topLeft = parseInt(currentCell) - 21;
    cells.topRight = parseInt(currentCell) - 19;





    //console.log(cells.topLeft, cells.topMid, cells.topRight);
}

function checkBottom(e) {


    currentCell = e.id;
    cells.bottomMid = parseInt(currentCell) + 20;
    cells.bottomLeft = parseInt(currentCell) + 19;
    cells.bottomRight = parseInt(currentCell) + 21;



    // console.log(cells.bottomLeft, cells.bottomMid, cells.bottomRight);
}

function checkMid(e) {
    currentCell = e.id;
    cells.leftCenter = parseInt(currentCell) - 1;
    cells.rightCenter = parseInt(currentCell) + 1;


    //console.log(cells.leftCenter, cells.rightCenter);
}


function generateBombs() {
    for (let i = 0; i <= 20; i++) {
        bombs.push(Math.floor(Math.random() * 400 + 1));
    }
    //  console.log(bombs)
}
generateBombs();
